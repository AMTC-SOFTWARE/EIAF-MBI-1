from PyQt5.QtCore import QState, pyqtSignal
from cv2 import imread, imwrite
from paho.mqtt import publish
from threading import Timer
########### MODIFICACION ########### 
from time import sleep
########### MODIFICACION ########### 
from shutil import copyfile
from time import strftime
from copy import copy
from math import ceil
import json
#librería para ordenar diccionarios
from operator import itemgetter, attrgetter

#{"text": f"en la caja {box} y posicion {cavity}", "color": "green"}

class Robot(QState):
    ok  = pyqtSignal()
    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module
        self.sensor = "color_sensor_" + self.module[-1]

        print("se creo un objeto de robot con modulo: ", self.module)

        self.set_robot      = SetRobot(module = self.module, model = self.model, parent = self)
        self.triggers       = Triggers(module = self.module, model = self.model, parent = self)
        self.standby        = QState(self)
        self.receiver       = Receiver(module = self.module, model = self.model, parent = self)
        self.error          = Error(module = self.module, model = self.model, parent = self)
        self.retry          = Retry(module = self.module, model = self.model, parent = self) 
        self.manual         = Manual(module = self.module, model = self.model, parent = self)
        self.manual_standby = ManualStandby(module = self.module, model = self.model, parent = self)
        self.retirar        = RetirarFusible(module = self.module, model = self.model, parent = self)
        self.receiver_error = ReceiverError(module = self.module, model = self.model, parent = self)
        self.loaded_standby = LoadedStandby(module = self.module, model = self.model, parent = self)

        self.trigger_standby= TriggerStandby(module = self.module, model = self.model, parent = self)

        ###Transiciones son el hecho de moverte de un estado a otro estado
        ###lo que genera una transición es un evento y un evento es una señal (un emit)

        ###self.model.transitions.... es la señal, es un apuntador a los 
        ###métodos de la clase Mqtt;
        ###self.client             = MqttClient(self.model, parent = self)
        ###self.model.transitions  = self.client

        ############################################################################################################

        #presionar retry boton te mandará a este estado
        self.addTransition(self.model.transitions.retry_btn, self.retry)
        #un error de inserción marcado por parte del robot te mandará a este estado
        self.addTransition(self.model.transitions.error, self.error)

        #al haber terminado el estado retry se manda la señal ok y se va a set_robot
        self.retry.addTransition(self.retry.ok, self.set_robot)
        #cuando el robot manda un "READY" se pasa a set_robot para enviar mensaje de "preparando robot"
        self.set_robot.addTransition(self.model.transitions.ready, self.set_robot)
        #en set_robot se pregunta si quedan fusibles en cola, si quedan se manda un set_robot.ok y sigues al estado triggers, si no quedan se manda un set_robot.finish
        self.set_robot.addTransition(self.set_robot.ok, self.triggers)
        #en triggers pueden pasar dos cosas, o se manda al robot a hacer una inserción, o se manda un triggers.ok de que ya no hay fusibles en cola
        #self.model.transitions.loaded es un mensaje del robot que ya tomó un fusible y esto manda al estado loaded standby de espera de inserción (y mostrar fusible tomado)
        self.triggers.addTransition(self.model.transitions.loaded, self.loaded_standby)

        #se quedará en este estado standby hasta que self.model.detener_robot_opuesto = False al dar retry btn (cuando falla el robot opuesto)
        self.triggers.addTransition(self.triggers.parallel_robot_error,  self.standby)

        #si la zona está ocupada por otro robot, se va a trigger_standby
        self.triggers.addTransition(self.triggers.waiting_zone,  self.trigger_standby)
        #sale de este estado cuando el robot que ocupaba la zona mande un trigger available
        self.trigger_standby.addTransition(self.model.transitions.available,  self.triggers)

        #(posibilidades dentro de standby: inserción correcta, retry_btn, error de inserción)
        #self.model.transitions.inserted es un mensaje del robot que ya insertó correctamente el fusible
        self.loaded_standby.addTransition(self.model.transitions.inserted, self.receiver)
        #en el estado receiver te dice que la inserción fue correcta y se actualizan las imagenes, se pintan los bounding box de los fusibles insertados, 
        #y continúas a triggers para siguiente fusible en cola
        self.receiver.addTransition(self.receiver.ok, self.triggers)
        #este menciona una exception en el código para mostrar imagenes, lo cual te manda al estado
        self.receiver.addTransition(self.receiver.nok, self.receiver_error)

        #cuando se haya intentado cierto numero de veces la insercion se habilita el estado manual
        self.error.addTransition(self.error.limite_reintentos, self.manual)
        #manual mostrará un mensaje para tomar una desición, y se quedará esperando en manual_standby
        self.manual.addTransition(self.manual.manual_ok, self.manual_standby)
        #dar llave te lleva al estado de retirar el fusible de la cola de tareas
        self.manual_standby.addTransition(self.model.transitions.key,self.retirar)
        #este es para mostrar un contador que antes de retirar de la cola el fusible
        self.retirar.addTransition(self.retirar.cont_ok,self.retirar)
        #una vez que se retiró correctamente el fusible de la cola de tareas se regresa a retry
        self.retirar.addTransition(self.retirar.retirado_ok, self.retry)

        #solo mandará el OK esta clase Robot hasta que triggers (triggers.ok) y set_robot (set_robot.finish) manden sus señales
        self.triggers.ok.connect(self.ok)
        #este connect no es necesario pero es por seguridad de que se de un retry_btn antes de finalizar
        self.set_robot.finish.connect(self.ok)

        #inicializas la máquina de estados con el estado inicial de retry
        self.setInitialState(self.retry)

#cada clase es un estado diferente, al cual llegas por las transiciones
#pueden ser varios eventos diferentes los que te lleven a un estado, por ejemplo al estado de error

class Retry(QState):
    ok  = pyqtSignal()
    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model  = model
        self.module = module
    def onEntry(self, QEvent):

        print("current state: Retry")

        sleep(0.2)
        publish.single(self.model.pub_topics["robot_a"],json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
        sleep(0.2)
        publish.single(self.model.pub_topics["robot_b"],json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)

        for i in self.model.robots:
            self.model.robots[i]["ready"] = False
        
        #se quita esta variable para detener al robot opuesto
        self.model.detener_robot_opuesto = False

        print("self.model.robots_mode EN RETRY DE ROBOT PRINCIPAL= ",self.model.robots_mode)
        #si está habilitado el modo de dos robots
        if self.model.robots_mode == 2:
            self.model.init_thread_robot = True
            print("init_thread_robot = ",self.model.init_thread_robot)
            print("Iniciar el segundo robot en paralelo")
        else:
            self.model.init_thread_robot = False
            print("init_thread_robot = ",self.model.init_thread_robot)
            print("NO Iniciar el segundo robot en paralelo")


        sleep(0.4)
        self.model.robothome_a = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
        publish.single(self.model.pub_topics["robot_a"],json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)
        sleep(0.4)
        self.model.robothome_b = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
        publish.single(self.model.pub_topics["robot_b"],json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)


        #Timer(0.4, self.startRobot_A).start()
        #Timer(0.4, self.startRobot_B).start()

        self.model.robots[self.module]["retry"] = False

        self.ok.emit()

    def startRobot_A(self):
        self.model.robothome_a = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
        publish.single(self.model.pub_topics["robot_a"],json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)
        

    def startRobot_B(self):
        self.model.robothome_b = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
        publish.single(self.model.pub_topics["robot_b"],json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)
        
            

class SetRobot(QState):
    ok      = pyqtSignal()
    finish  = pyqtSignal()
    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model  = model
        self.module = module
    def onEntry(self, QEvent):

        print("current state: SetRobot")
        print("self.module: ",self.module)

        if len(self.model.robots[self.module]["queueIzq"]) or len(self.model.robots[self.module]["queueDer"]):
            command = {
                "lbl_result" : {"text": "Preparando robot", "color": "green"},
                "lbl_steps" : {"text": "Por favor espere", "color": "black"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            if self.model.robots[self.module]["ready"]:
                self.model.robots[self.module]["ready"] = False
                Timer(0.1, self.ok.emit).start()
        else:
            print("Finish de robot.py emit()")
            self.finish.emit()

class Triggers (QState):
    ok                   = pyqtSignal()
    parallel_robot_error = pyqtSignal()
    waiting_zone         = pyqtSignal()

    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model      = model
        self.module     = module
        self.shared_queue = ""
        self.mensaje_shared_response = ""
        self.mensaje_shared_send = ""

    def onEntry(self, event):
        
        print("current state: Triggers")
        print("Triggers self.module-----", self.module)

        #///////////////////////////////////////////////////////////////////////
        if self.model.acomodo_listas:
            self.model.acomodo_listas = False

            new_queue = []
            robots_queue_temp = []
            queue_fusible = []

            listas = {"queueDer","queueIzq"}

            for queue in listas:

                print("queue: ",queue)

                for i in self.model.robots[self.module][queue]:
                    queue_fusible.append(i[2])
                    if len(robots_queue_temp) == 0:
                        robots_queue_temp.append(copy(queue_fusible))
                    else:
                        already = False
                        for j in range(len(robots_queue_temp)):
                            if robots_queue_temp[j][0] == queue_fusible[0]:
                                already = True
                            else:
                                #si ya es la ultima j del arreglo
                                if j == len(robots_queue_temp) - 1:
                                    #si nunca se hizo True, es porque no hubo coincidencia
                                    if already == False:
                                        robots_queue_temp.append(copy(queue_fusible))
                    queue_fusible.clear()

                print("\nrobots_queue_temp FUSIBLES: ",robots_queue_temp)

                #guardas en las listas, los elementos que correspondan a su tipo de fusible
                for i in self.model.robots[self.module][queue]:    
                    # i = ["CAJA","CAVIDAD","FUSIBLE"]
                    # FUSIBLE = i[2] = ["type,amp,color"]  = ["ATO,25,white"] es un string
                    for j in range(len(robots_queue_temp)):
                        if robots_queue_temp[j][0] == i[2]:
                            robots_queue_temp[j].append(i)

                #quitas el primer elemento (que solo es un identificador de que tipo de fusibles son en esa lista)
                #agregas al final cuantos fusibles tiene cada lista
                for w in range(len(robots_queue_temp)):
                    robots_queue_temp[w].pop(0)
                    robots_queue_temp[w].append([len(robots_queue_temp[w])])

                #imprimir la lista con los fuisbles en cola
                print("\n\nrobots_queue_temp FUSIBLE,FUSIBLES EN COLA: ")
                for a in range(len(robots_queue_temp)):
                    print(robots_queue_temp[a])

                #ordenar las listas desde la que tiene más fusibles hasta la que tiene menos
                for c in range(len(robots_queue_temp)):
                    for k in range(len(robots_queue_temp)):
                        if robots_queue_temp[c][-1] > robots_queue_temp[k][-1]:
                            robots_queue_temp[c],robots_queue_temp[k] = robots_queue_temp[k], robots_queue_temp[c]
            
                #se imprime lista y se elimina el ultimo elemento, el cual es la cantidad de fusibles de cada lista
                print("\n\nrobots_queue_temp ORDENADOS POR CANTIDAD: ")
                for s in range(len(robots_queue_temp)):
                    robots_queue_temp[s].pop(-1)
                    print(robots_queue_temp[s])
 
                #guardar en una nueva lista los fuisbles ordenados de tal forma que no se 
                #pidan fusibles iguales seguidos, para dar tiempo a bowls de acomodar
                while len(robots_queue_temp) > 0:

                    try:
                        if len(robots_queue_temp[0]) > 0:
                            new_queue.append(robots_queue_temp[0][0])
                            robots_queue_temp[0].pop(0)
                        else:
                            robots_queue_temp.pop(0)
                    except:
                        pass

                    try:
                        if len(robots_queue_temp[1]) > 0:     
                            new_queue.append(robots_queue_temp[1][0])
                            robots_queue_temp[1].pop(0)
                        else:
                            robots_queue_temp.pop(1)
                    except:
                        pass
        
                #se guarda en la variable del modelo una copia de la nueva lista creada (ya acomodada como se quiere)
                self.model.robots[self.module][queue] = copy(new_queue)

                #se hace clear de las variables para volver a utilizarlas en queueDer y queueIzq
                robots_queue_temp.clear()
                new_queue.clear()
                queue_fusible.clear()

                print("\n\n")

            # se cambia la posición del FUSIBLE de la cavidad F300 de la lista queueIzq (debe insertarse después del MINI que vaya en F301
            try:
                encontrado = False

                #["PDC-P", "F300", "ATO,15,blue"]
                posicion_final = len(self.model.robots[self.module]["queueIzq"]) - 1
                elemento_final = self.model.robots[self.module]["queueIzq"][int(posicion_final)]
                print("posicion final: ", int(posicion_final))
                print("elemento en posicion final: ",self.model.robots[self.module]["queueIzq"][int(posicion_final)])

                for elemento in self.model.robots[self.module]["queueIzq"]:
                    if "F300" in elemento:
                        posicion_cavidad = self.model.robots[self.module]["queueIzq"].index(elemento)
                        elemento_cavidad = elemento
                        print("posicion cavidad F300: ",posicion_cavidad)
                        print("elemento cavidad: ",elemento_cavidad)
                        encontrado = True

                if encontrado:
                    self.model.robots[self.module]["queueIzq"][int(posicion_final)] = elemento_cavidad
                    self.model.robots[self.module]["queueIzq"][int(posicion_cavidad)] = elemento_final
                    print("intercambio realizado")
            except:
                pass

            #se asignan las variables del modelo a unas propias de la clase para facilitar su manejo (la nueva variable depende directamente de la original)
            self.queueIzq      = self.model.robots[self.module]["queueIzq"]
            self.queueDer      = self.model.robots[self.module]["queueDer"]
        #///////////////////////////////////////////////////////////////////////

        #si el robot opuesto está detenido debido a un error de insercion, este
        # se va a estado standby, después de hacer su última inserción,
        #a esperar el reset_btn
        if self.model.detener_robot_opuesto == True:
            print("esperando robot opuesto")
            self.parallel_robot_error.emit()

        #si el robot opuesto no está detenido, le permite continúar
        else:

            #se selecciona la queue correspondiente a a la zona compartida para el robot actual

            if self.module == "robot_a":
                self.shared_queue = "Der"
                self.mensaje_shared_send = "used_by_robot_a"
                self.mensaje_shared_response = "used_by_robot_b"
                print("module: ",self.module,"\nmensaje_shared_send: ",self.mensaje_shared_send,"\nmensaje_shared_response: ",self.mensaje_shared_response )

            if self.module == "robot_b":
                self.shared_queue = "Izq"
                self.mensaje_shared_send = "used_by_robot_b"
                self.mensaje_shared_response = "used_by_robot_a"
                print("module: ",self.module,"\nmensaje_shared_send: ",self.mensaje_shared_send,"\nmensaje_shared_response: ",self.mensaje_shared_response )

            if len(self.queueIzq) > 0:
                self.model.popQueueIzq = True
                self.model.popQueueDer = False

                current_trig = self.model.robots[self.module]["current_trig"] = self.queueIzq[0]

                print("*******self.queueIzq*******\n")
                for i in range(len(self.queueIzq)):
                    print(self.queueIzq[i])

                box             = current_trig[0]
                cavity          = current_trig[1]
                fuse            = current_trig[2].split(sep = ",") # ["type", "current", "color"]


                if box == "PDC-RMID" and cavity == "F96":
                    box = "F96_box"
                    command = {
                    "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                    "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                    "img_center": f"{box}.jpg",
                    "img_fuse": "vacio.jpg"
                    }
                elif box == "PDC-R" and cavity == "F96":
                    box = "F96_box"
                    command = {
                    "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                    "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                    "img_center": f"{box}.jpg",
                    "img_fuse": "vacio.jpg"
                    }
                elif box == "PDC-RMID":
                    if self.model.database["fuses"]["PDC-RMID"]["F96"] != "empty":
                        command = {
                        "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                        "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                        "img_center": f"{box}.jpg",
                        "img_fuse": "F96_box.JPG"
                        }
                    else:
                        command = {
                        "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                        "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                        "img_center": f"{box}.jpg",
                        "img_fuse": "vacio.jpg"
                        }
                elif box == "PDC-R":
                    if self.model.database["fuses"]["PDC-R"]["F96"] != "empty":
                        command = {
                        "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                        "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                        "img_center": f"{box}.jpg",
                        "img_fuse": "F96_box.JPG"
                        }
                    else:
                        command = {
                        "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                        "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                        "img_center": f"{box}.jpg",
                        "img_fuse": "vacio.jpg"
                        }

                else:
                    command = {
                        "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                        "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                        "img_center": f"{box}.jpg",
                        "img_fuse": "vacio.jpg"
                        }
                    if "REL" in cavity:
                        command["lbl_steps"] = {"text": f"Tomando Relay", "color": "black"}
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            
                if box == "TBLU":
                    cavity = "F10" + cavity[-1]
                if box == "PDC-S":
                    cavity = "F11" + cavity[-1]
                if "_clear" in fuse[2]:
                    fuse[0] = fuse[0] + "C"

                box = box.replace("-","")
                command = {"trigger": f"{fuse[0]}_{fuse[1]},{box},{cavity}"}
                if "REL" in cavity:
                    temp = ""
                    if "60" in fuse[1]:
                        temp = "RELAY_132"
                    elif "70" in fuse[1]:
                        temp = "RELAY_112"
                    command["trigger"] =  f"{temp},{box},{cavity}"

                print("*******current_trig*******\n")
                print("BOX: ",box,"\nCAVITY: ",cavity,"\nFUSE: ",fuse)

                if self.shared_queue == "Izq":
                    print("self.shared_queue = Izq: ",self.module)
                    print("self.model.shared_zone: ",self.model.shared_zone)
                    #si el mensaje es diferente al de "used_by_robot_(correspondiente), es que está disponible
                    if self.model.shared_zone != self.mensaje_shared_response:
                        #se avisa que este robot está usando la zona compartida, no está disponible para el otro robot
                        self.model.shared_zone = self.mensaje_shared_send
                        print("self.model.shared_zone: ",self.model.shared_zone)
                        print("enviando instruccion al robot: ",self.module)
                        #SE MANDA MENSAJE AL ROBOT PARA IR POR ESE FUSIBLE, A ESA CAJA, A ESA CAVIDAD A INSERTAR
                        Timer(0.1, self.robotTrigger, args = (command, )).start()
                    else:
                        print("esperando a que la zona compartida se libere *****************************************************")
                        self.waiting_zone.emit()
                else:
                    #SE MANDA MENSAJE AL ROBOT PARA IR POR ESE FUSIBLE, A ESA CAJA, A ESA CAVIDAD A INSERTAR
                    print("enviando instruccion al robot: ",self.module)
                    Timer(0.1, self.robotTrigger, args = (command, )).start()


            elif len(self.queueDer) > 0:
                self.model.popQueueIzq = False
                self.model.popQueueDer = True
                print("+++++++++ENTRAMOS AL ELIF PARA LADO DERECHO+++++++++++++++++")

                #if self.model.var_queue == 0:
                #    current_trig = self.model.robots[self.module]["current_trig"] = self.queueDer[0]
                #else:
                #    current_trig = self.model.robots[self.module]["current_trig"] = self.queueDer[-1]

                current_trig = self.model.robots[self.module]["current_trig"] = self.queueDer[0]

                print("*******self.queueDer*******\n")
                for i in range(len(self.queueDer)):
                    print(self.queueDer[i])

                box             = current_trig[0]
                cavity          = current_trig[1]
                fuse            = current_trig[2].split(sep = ",") # ["type", "current", "color"]

                ######### Modificación para F96 #########
                if box == "PDC-RMID" and cavity == "F96":
                    box = "F96_box"
                    command = {
                    "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                    "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                    "img_center": f"{box}.jpg",
                    "img_fuse": "vacio.jpg"
                    }
                elif box == "PDC-R" and cavity == "F96":
                    box = "F96_box"
                    command = {
                    "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                    "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                    "img_center": f"{box}.jpg",
                    "img_fuse": "vacio.jpg"
                    }
                elif box == "PDC-RMID":
                    if self.model.database["fuses"]["PDC-RMID"]["F96"] != "empty":
                        command = {
                        "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                        "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                        "img_center": f"{box}.jpg",
                        "img_fuse": "F96_box.JPG"
                        }
                    else:
                        command = {
                        "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                        "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                        "img_center": f"{box}.jpg",
                        "img_fuse": "vacio.jpg"
                        }
                elif box == "PDC-R":
                    if self.model.database["fuses"]["PDC-R"]["F96"] != "empty":
                        command = {
                        "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                        "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                        "img_center": f"{box}.jpg",
                        "img_fuse": "F96_box.JPG"
                        }
                    else:
                        command = {
                        "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                        "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                        "img_center": f"{box}.jpg",
                        "img_fuse": "vacio.jpg"
                        }
                ######### Modificación para F96 #########
                else:
                    command = {
                        "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                        "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                        "img_center": f"{box}.jpg",
                        "img_fuse": "vacio.jpg"
                        }
                    if "REL" in cavity:
                        command["lbl_steps"] = {"text": f"Tomando Relay", "color": "black"}
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            
                if box == "TBLU":
                    cavity = "F10" + cavity[-1]
                if box == "PDC-S":
                    cavity = "F11" + cavity[-1]
                if "_clear" in fuse[2]:
                    fuse[0] = fuse[0] + "C"

                box = box.replace("-","")
                command = {"trigger": f"{fuse[0]}_{fuse[1]},{box},{cavity}"}
                if "REL" in cavity:
                    temp = ""
                    if "60" in fuse[1]:
                        temp = "RELAY_132"
                    elif "70" in fuse[1]:
                        temp = "RELAY_112"
                    command["trigger"] =  f"{temp},{box},{cavity}"
            
                print("*******current_trig*******\n")
                print("BOX: ",box,"\nCAVITY: ",cavity,"\nFUSE: ",fuse)

                if self.shared_queue == "Der":
                    print("self.shared_queue = Der: ",self.module)
                    print("self.model.shared_zone: ",self.model.shared_zone)
                    #si el mensaje es diferente al de "used_by_robot_(correspondiente), es que está disponible
                    if self.model.shared_zone != self.mensaje_shared_response:
                        #se avisa que este robot está usando la zona compartida, no está disponible para el otro robot
                        self.model.shared_zone = self.mensaje_shared_send
                        print("self.model.shared_zone: ",self.model.shared_zone)
                        print("enviando instruccion al robot: ",self.module)
                        #SE MANDA MENSAJE AL ROBOT PARA IR POR ESE FUSIBLE, A ESA CAJA, A ESA CAVIDAD A INSERTAR
                        Timer(0.1, self.robotTrigger, args = (command, )).start()
                    else:
                        print("esperando a que la zona compartida se libere")
                        self.waiting_zone.emit()
                else:
                    print("enviando instruccion al robot: ",self.module)
                    Timer(0.1, self.robotTrigger, args = (command, )).start()


            else: #YA NO HAY FUSIBLES EN COLA
            
                command = {"trigger": "HOME"}
                publish.single(self.model.pub_topics[self.module] ,json.dumps(command),hostname='127.0.0.1', qos = 2)

                #para que el robot a solo pueda liberar las cajas de su lado al terminar
                if self.module == "robot_a":
                    self.model.databaseTempModel.clear()
                    self.model.databaseTempModel.append("PDC-D")
                    self.model.databaseTempModel.append("PDC-P")

                if self.module == "robot_b":
                    self.model.databaseTempModel.clear()
                    self.model.databaseTempModel.append("PDC-R")
                    self.model.databaseTempModel.append("PDC-RMID")
                    self.model.databaseTempModel.append("PDC-S")
                    self.model.databaseTempModel.append("TBLU")

                command = {}
                for i in self.model.databaseTempModel:
                    print("i Caja a liberar: ",i)
                    command[i] = False
                print("Command Final para liberar cajas: ",command)
                #command = {f"{self.model.box_change}": False}
                publish.single(self.model.pub_topics["plc"],json.dumps(command),hostname='127.0.0.1', qos = 2)

                #print("Enviando robots a Home - STOP - START")
                #sleep(0.2)
                #self.robotTrigger({"command": "stop"})
                #sleep(0.4)
                #self.robotTrigger({"command": "start"})

                #para permitir la asignación de queue cuando se trabaja con el siguiente robot que utilice la clase de robot.py
                self.model.acomodo_listas = True

                command = {
                    "lbl_result" : {"text": f"Inserciones del {self.module} terminadas", "color": "green"},
                    "lbl_steps" : {"text": "", "color": "black"}
                    }
                print("Triggers.ok de robot.py emit()")

                Timer(1.5, self.ok.emit).start()


    def robotTrigger(self, command):

        publish.single(self.model.pub_topics[self.module] ,json.dumps(command),hostname='127.0.0.1', qos = 2)


class Receiver(QState):
    ok  = pyqtSignal()
    nok = pyqtSignal()
    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):

        print("current state: Receiver")

        box             = self.model.robots[self.module]["current_trig"][0]
        cavity          = self.model.robots[self.module]["current_trig"][1]
        value           = self.model.robots[self.module]["current_trig"][2]
        try:
            #self.model.drawBB(draw = [box, cavity], color = (0, 255, 0))
            #imwrite(self.model.imgs_path + box + ".jpg", self.model.imgs[box])

            if box == "PDC-RMID" and cavity == "F96":
                box = "F96_box"
                self.model.drawBB(draw = [box, cavity], color = (0, 255, 0))
                imwrite(self.model.imgs_path + box + ".jpg", self.model.imgs[box])
                #self.model.database["fuses"][box][cavity] = value
                command = {
                    "lbl_steps" : {"text": f"Insercion correcta en {box}: {cavity}", "color": "black"},
                    "img_center" : box + ".jpg"
                    }
            elif box == "PDC-R" and cavity == "F96":
                box = "F96_box"
                self.model.drawBB(draw = [box, cavity], color = (0, 255, 0))
                imwrite(self.model.imgs_path + box + ".jpg", self.model.imgs[box])
                #self.model.database["fuses"][box][cavity] = value
                command = {
                    "lbl_steps" : {"text": f"Insercion correcta en {box}: {cavity}", "color": "black"},
                    "img_center" : box + ".jpg"
                    }
            else:
                self.model.drawBB(draw = [box, cavity], color = (0, 255, 0))
                imwrite(self.model.imgs_path + box + ".jpg", self.model.imgs[box])
                #self.model.database["fuses"][box][cavity] = value
                command = {
                    "lbl_steps" : {"text": f"Insercion correcta en {box}: {cavity}", "color": "black"},
                    "img_center" : box + ".jpg",
                    "img_fuse": "vacio.jpg"
                    }

            #este mensaje solo se publica cuando el otro robot no entró en error
            if self.model.detener_robot_opuesto == False:
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

            Timer(0.05, self.ok.emit).start()

            # para quitar de la lista(en cola) el fusible insertado
            self.model.robots[self.module]["current_trig"] = None

            if self.model.popQueueIzq == True and self.model.popQueueDer == False:
                #if self.model.var_queue == 0:
                #    self.model.robots[self.module]["queueIzq"].pop(0)
                #    self.model.var_queue = 1
                #else:
                #    self.model.robots[self.module]["queueIzq"].pop(-1)
                #    self.model.var_queue = 0
                self.model.robots[self.module]["queueIzq"].pop(0)

            if self.model.popQueueIzq == False and self.model.popQueueDer == True:
                #if self.model.var_queue == 0:
                #    self.model.robots[self.module]["queueDer"].pop(0)
                #    self.model.var_queue = 1
                #else:
                #    self.model.robots[self.module]["queueDer"].pop(-1)
                #    self.model.var_queue = 0
                self.model.robots[self.module]["queueDer"].pop(0)

            #para reinicar contador de veces que entra a error
            self.model.contador_error = 0

        except Exception as ex:
            print("Receiver exception: ", ex)
            command = {
                "lbl_result" : {"text": f"ERROR: {ex.args}", "color": "red"},
                "lbl_steps" : {"text": f"Presionar boton o girar llave", "color": "black"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.model.robots[self.module]["error"] = ex.args
            self.nok.emit()

class Error(QState):
    limite_reintentos  = pyqtSignal()
    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model      = model
        self.module     = module

    def onEntry(self, event):

        print("current state: Error")
        self.model.transitions.thread_triggers_off()

        #esta variable es para detener al robot opuesto pero dejarlo intentar su ultima inserción
        self.model.detener_robot_opuesto = True

        box = self.model.robots[self.module]["current_trig"][0]
        cavity = self.model.robots[self.module]["current_trig"][1]
        if box == "PDC-RMID" and cavity == "F96":
            box = "F96_box"
        if box == "PDC-R" and cavity == "F96":
            box = "F96_box"
        # GUARDAR LOS INTENTOS QUE LLEVA EN ESE FUSIBLE EN EL MODELO
        # ESTO SE GUARDARÁ EN LA BASE DE DATOS AL SALIR DE LA CLASE ROBOT
        if not(box) in self.model.retries:
            self.model.retries[box] = {}
            self.model.retries[box][cavity] = 1
        else:
            if not(cavity) in self.model.retries[box]:
                self.model.retries[box][cavity] = 1
            else: 
                self.model.retries[box][cavity] += 1
        print("REINTENTOS: ",self.model.retries)

        ###################################
        # Condición para transicionar a estado de inserción manual
        self.model.contador_error = self.model.contador_error + 1
        print("número de errores de inserción: ")
        print(self.model.contador_error)

        #en esta línea haces un publish para modificar el valor del modbus ERROR_insertion a true, indicando el error
        publish.single(self.model.pub_topics["plc"],json.dumps({"ERROR_insertion": True}),hostname='127.0.0.1', qos = 2)

        #se da a la variable "error" el valor de lo que se leyó en el MQTT, que para este caso sería
        #lo que se publica desde el Robot por TCP/IP, response: ERROR_insertion
        error = self.model.robots[self.module]["error"]

        #si el relevador que falló fue el rosa, se irá directo al estado manual
        if cavity == "RELX":
            self.limite_reintentos.emit()
            
        if cavity == "RELU":
            self.limite_reintentos.emit()
            
        if cavity == "RELT":
            self.limite_reintentos.emit()

        if self.model.contador_error == self.model.max_reintentos:
            self.limite_reintentos.emit()

        elif self.model.contador_error < self.model.max_reintentos:

            try:

                #error = self.model.plc["error"]
                Timer(0.5, self.restartRobot).start()

                #diccionario con las llaves "lbl_result", estas llaves corresponden a un objeto en la interfaz gráfica
                #valor, texto que quieres
                #color, color que quieres
                #GUI y CONTROLLER interactuan con mensajes MQTT
                command = {
                    "lbl_result" : {"text": f"ERROR de inserción", "color": "red"},
                    "lbl_steps" : {"text": f"Retirar fusible {box}: {cavity} y reintentar", "color": "black"}
                    }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                #en esta línea se hace un publish del diccionario "command" que creaste, para mostrar en la pantalla (gui)
                #el mensaje de error y el fusible y cavidad correspondientes

                try:
                    self.model.drawBB(draw = [box, cavity], color = (0, 0, 255))
                    imwrite(self.model.imgs_path + box + ".jpg", self.model.imgs[box])

                    command = {
                        "img_center" : box + ".jpg"
                        }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                except:
                    pass

            except Exception as ex:
                print("ERROR exception: ", ex)

    def restartRobot(self):

        if self.module == "robot_a":
            self.model.robothome_a = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
        if self.module == "robot_b":
            self.model.robothome_b = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py

        self.model.robots[self.module]["ready"] = False

        sleep(0.2)
        publish.single(self.model.pub_topics[self.module] ,json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
        sleep(0.4)
        publish.single(self.model.pub_topics[self.module] ,json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)

    def onExit(self, QEvent):

        #se limpia el error
        self.model.robots[self.module]["error"] = ""
        # se apaga el error en el plc (que enciende coil en GDI y en andon de plc)
        publish.single(self.model.pub_topics["plc"],json.dumps({"ERROR_insertion": False}),hostname='127.0.0.1', qos = 2)

        if self.model.contador_error < self.model.max_reintentos:
            command = {
                "lbl_result" : {"text": "Reintentando", "color": "green"},
                "lbl_steps" : {"text": "", "color": "black"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

class Manual(QState):

    manual_ok  = pyqtSignal()

    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):


        print("current state: Manual")

        #se lee del modelo la caja y cavidad actuales
        box = self.model.robots[self.module]["current_trig"][0]
        cavity = self.model.robots[self.module]["current_trig"][1]
        fuse = self.model.robots[self.module]["current_trig"][2].split(sep = ",") # ["type", "current", "color"]
        fusetemp = []
        fusetemp = fuse
        ######### Modificación para F96 #########
        if box == "PDC-RMID" and cavity == "F96":
            box = "F96_box"
        if box == "PDC-R" and cavity == "F96":
            box = "F96_box"
        ######### Modificación para F96 #########

        if "REL" in cavity:
            if "60" in fuse[1]:
                fusetemp[1] = "RELAY_132"
            elif "70" in fuse[1]:
                fusetemp[1] = "RELAY_112"


        #se guarda el número de intentos que lleva este fusible
        reintentos = self.model.retries[box][cavity]

        #dibujar un box de color naranja para esta cavidad
        self.model.drawBB(draw = [box, cavity], color = (0, 128, 255))
        imwrite(self.model.imgs_path + box + ".jpg", self.model.imgs[box])

        #se reinicia el contador de intentos para fusible
        self.model.contador_error = 0

        if self.module == "robot_a":
            self.model.robothome_a = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
        if self.module == "robot_b":
            self.model.robothome_b = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py

        self.model.robots[self.module]["retry"] = False

        sleep(0.2)
        publish.single(self.model.pub_topics[self.module] ,json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
        sleep(0.4)
        publish.single(self.model.pub_topics[self.module] ,json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)


        command = {
                    "lbl_result" : {"text": f"Reintentos: {reintentos}. Para reintentar presionar boton amarillo.", "color": "blue"},
                    "lbl_steps" : {"text": f"Para continuar, Insertar Manual y pedir llave a calidad", "color": "green"},
                    "lbl_info1" : {"text": f"[CAJA]:[{box}]\n[CAVIDAD]:[{cavity}]\n[FUSIBLE]:[{fusetemp[0]} {fusetemp[1]}]", "color": "red"},
                    "img_center" : box + ".jpg"
                    }

        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        #for i in range(10):
            #cuenta = 10 - i

        print("emit manual_ok")
        self.manual_ok.emit()

class ManualStandby(QState):

    #manual_standby  = pyqtSignal()

    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):

        print("current state: ManualStandby")

        #bandera para funcionamiento de la llave sin mensaje de confirmación
        self.model.fusible_manual = True
        print("Esperando botón de reintento o llave de calidad")

    def onExit(self, QEvent):
        #al salir de este estado con llave o con retry_btn,
        #vuelve a habilitarse el funcionamiento 
        self.model.fusible_manual = False
        command = {"lbl_info1" : {"text": "", "color": "red"}}
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

class RetirarFusible(QState):

    retirado_ok  = pyqtSignal()
    cont_ok  = pyqtSignal()

    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):

        print("current state: RetirarFusible")

        command = {
                    "lbl_result" : {"text": f"Fusible insertado manualmente.", "color": "green"},
                    "lbl_steps" : {"text": f"Continuando en {self.model.screen_cont} :con siguiente insercion.", "color": "blue"}
                    }

        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        if self.model.screen_cont > 0:

            self.model.screen_cont = self.model.screen_cont - 1
            print("cont_ok emit()")
            Timer(1,self.cont_ok.emit).start()
        
        elif self.model.screen_cont <= 0:

            # para quitar de la lista(en cola) el fusible insertado
            # después de haber hecho "cont_ok" 3 veces (las veces dependiendo de screen_cont)
            self.model.robots[self.module]["current_trig"] = None

            if self.model.popQueueIzq == True and self.model.popQueueDer == False:
                #if self.model.var_queue == 0:
                #    self.model.robots[self.module]["queueIzq"].pop(0)
                #    self.model.var_queue = 1
                #else:
                #    self.model.robots[self.module]["queueIzq"].pop(-1)
                #    self.model.var_queue = 0
                self.model.robots[self.module]["queueIzq"].pop(0)

            if self.model.popQueueIzq == False and self.model.popQueueDer == True:
                #if self.model.var_queue == 0:
                #    self.model.robots[self.module]["queueDer"].pop(0)
                #    self.model.var_queue = 1
                #else:
                #    self.model.robots[self.module]["queueDer"].pop(-1)
                #    self.model.var_queue = 0
                self.model.robots[self.module]["queueDer"].pop(0)


            self.model.screen_cont = self.model.screen_cont_reset 
            print("retirado_ok emit()")
            self.retirado_ok.emit()
        
class ReceiverError(QState):

    def __init__(self, module = "Receiver Error", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):

        print("current state: ReceiverError")

        command = {"lbl_info1" : {"text": "ERROR DE IMAGENES", "color": "red"}}
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

class LoadedStandby(QState):

    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model      = model
        self.module     = module
        

    def onEntry(self, QEvent):

        print("current state: Loaded_Standby")

        box     = self.model.robots[self.module]["current_trig"][0]
        cavity  = self.model.robots[self.module]["current_trig"][1]

        if box == "PDC-RMID" and cavity =="F96":
            box = "F96_box"
        if box == "PDC-R" and cavity =="F96":
            box = "F96_box"

        command = {
            "lbl_steps" : {"text": f"Insertando en {box} posicion {cavity}", "color": "black"}
            }

        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        

class TriggerStandby(QState):

    #trigger_standby  = pyqtSignal()

    def __init__(self, module = "robot_a", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):

        print("current state: TriggerStandby**************************************")
        print("Esperando zona compartida disponible para ",self.module)

    def onExit(self, QEvent):
        #al salir de este estado
        self.model.shared_zone = "available"
        print("self.model.shared_zone: ", self.model.shared_zone)

            
