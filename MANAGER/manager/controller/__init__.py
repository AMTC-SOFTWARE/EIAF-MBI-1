from PyQt5.QtCore import QObject, QStateMachine, QState, pyqtSlot, pyqtSignal, QTimer

from PyQt5.QtCore import QThread    # Librería para ejecuciones en paralelo
from time import sleep              # Para usar la función sleep(segundos)
from cv2 import imread, imwrite     # Librería de OpenCV para leer y escribir imagenes
from paho.mqtt.client import Client # Librería necesaria para conexión, para hacer publish a los labels
#from shutil import copyfile
#from math import ceil


from paho.mqtt import publish
from datetime import datetime
from threading import Timer
from time import strftime
from copy import copy
from os import system, path
import requests
import json
from controller.comm import MqttClient
from controller.model import Model
from controller.cycle_manage import *     
from controller import robot

#librería para ordenar diccionarios
from operator import itemgetter, attrgetter


class Controller (QObject):

    def __init__(self, parent = None):
        super().__init__(parent)

        self.model                  = Model(parent = self)
        self.client                 = MqttClient(self.model, parent = self)
        self.model.transitions      = self.client
        self.model.mainWindow       = parent
        self.stateMachine           = QStateMachine(self)


        self.startup                = Startup(model = self.model)
        self.show_login             = Login(model = self.model)
        self.check_login            = CheckLogin(model = self.model)

        self.process                = QState()

        self.start_cycle            = StartCycle(model = self.model, parent = self.process)
        self.scan_qr                = ScanQr(model = self.model, parent = self.process)
        self.check_qr               = CheckQr(model = self.model, parent = self.process)
        self.qr_rework              = QrRework(model = self.model)
        self.clamps_monitor_a       = ClampsMonitor(module = "clamps_a",model = self.model, parent = self.process)
        self.clamps_monitor_b       = ClampsMonitor(module = "clamps_b",model = self.model, parent = self.process)
        self.clamps_monitor_both    = ClampsMonitorBoth(module = "clamps",model = self.model, parent = self.process)
        self.clamps_standby_a       = Clamps_Standby(module = "clamps_a",model = self.model, parent = self.process)
        self.clamps_standby_b       = Clamps_Standby(module = "clamps_b",model = self.model, parent = self.process)
        self.clamps_standby_both    = Clamps_Standby(module = "clamps",model = self.model, parent = self.process)
        
        self.config                 = Config(model = self.model)
        self.reset                  = Reset(model = self.model)
        self.finish                 = Finish(model = self.model, parent = self.process)

        self.robot_a                = robot.Robot(module = "robot_a", model = self.model, parent = self.process)
        self.robot_b                = robot.Robot(module = "robot_b", model = self.model, parent = self.process)
        self.robot_both             = robot.Robot(module = "robot_a", model = self.model, parent = self.process)
        self.objeto_mythread        = MyThread(module = "robot_b", model = self.model, client = self.client, parent = self)
        self.objeto_mythread.start()

        self.waiting_robot          = Waiting_Robot(model = self.model, parent = self.process)
        
        self.startup.addTransition(self.startup.ok, self.show_login)
        self.show_login.addTransition(self.client.ID, self.check_login)
        self.show_login.addTransition(self.client.login, self.show_login)
        self.check_login.addTransition(self.check_login.nok, self.show_login)
        self.check_login.addTransition(self.check_login.ok, self.start_cycle)
        self.start_cycle.addTransition(self.client.config, self.config)
        self.config.addTransition(self.client.config_ok, self.start_cycle)
        self.start_cycle.addTransition(self.client.logout, self.startup)
        #self.start_cycle.addTransition(self.client.start, self.scan_qr)

        self.start_cycle.addTransition(self.client.F4, self.scan_qr)
        self.start_cycle.addTransition(self.client.CTRL, self.scan_qr)
        self.start_cycle.addTransition(self.client.start, self.scan_qr)

        self.scan_qr.addTransition(self.client.code, self.check_qr)
        self.check_qr.addTransition(self.check_qr.nok, self.scan_qr)
        self.check_qr.addTransition(self.check_qr.rework, self.qr_rework)
        self.qr_rework.addTransition(self.qr_rework.ok, self.check_qr)
        #self.check_qr.addTransition(self.check_qr.ok, self.clamps_monitor_a)

        self.check_qr.addTransition(self.check_qr.ok_F4, self.clamps_monitor_a)
        self.clamps_monitor_a.addTransition(self.client.clamp, self.clamps_monitor_a)
        self.clamps_monitor_a.addTransition(self.clamps_monitor_a.ok, self.clamps_standby_a)
        self.clamps_standby_a.addTransition(self.client.start, self.robot_a)
        self.robot_a.addTransition(self.robot_a.ok, self.clamps_monitor_b)
        self.clamps_monitor_b.addTransition(self.client.clamp, self.clamps_monitor_b)
        self.clamps_monitor_b.addTransition(self.clamps_monitor_b.ok, self.clamps_standby_b)
        self.clamps_standby_b.addTransition(self.client.start, self.robot_b)
        self.robot_b.addTransition(self.robot_b.ok, self.finish) 

        self.check_qr.addTransition(self.check_qr.ok_CTRL, self.clamps_monitor_both)
        self.clamps_monitor_both.addTransition(self.client.clamp, self.clamps_monitor_both)
        self.clamps_monitor_both.addTransition(self.clamps_monitor_both.ok, self.clamps_standby_both)
        self.clamps_standby_both.addTransition(self.client.start, self.robot_both)
        self.robot_both.addTransition(self.robot_both.ok, self.waiting_robot)
        self.waiting_robot.addTransition(self.waiting_robot.waiting, self.waiting_robot)
        self.waiting_robot.addTransition(self.waiting_robot.ok, self.finish)
        
        #################################################################

        self.finish.addTransition(self.finish.ok, self.start_cycle)
        self.process.addTransition(self.client.key, self.reset)
        self.reset.addTransition(self.reset.ok, self.start_cycle)
                                                                   
        self.stateMachine.addState(self.startup)
        self.stateMachine.addState(self.show_login)
        self.stateMachine.addState(self.check_login)
        self.stateMachine.addState(self.process)
        self.stateMachine.addState(self.config)
        self.stateMachine.addState(self.reset)
        self.stateMachine.addState(self.qr_rework)

        self.process.setInitialState(self.start_cycle)
        self.stateMachine.setInitialState(self.startup)

    @pyqtSlot()
    def start(self):
        self.client.setup()
        self.stateMachine.start()
      
class MyThread(QThread):
    def __init__(self, module = "robot_b", model = None, client = None, parent = QObject):
        super().__init__(parent)
        self.model  = model
        self.module = module
        self.client = client
        self.shared_queue = ""
        self.mensaje_shared_response = ""
        self.mensaje_shared_send = ""
        
        print("se crea un objeto de la clase MyThread con padre QThread")
        print("con entrada del objeto model de la clase model que está en model.py")
        print("y el objeto client de la clase MqttClient que está en comm.py")
        
    def run(self):

        while 1:

            #tiempo de espera para no alentar las ejecuciones de otros procesos
            sleep(0.2)  

            #si se inicia el modo dos robots e inicia el robot_a...
            if self.model.init_thread_robot == True:

                self.model.current_thread_robot = self.module

                #si se presiona el botón de reintento (o después de una inserción manual)
                if self.model.retry_thread_robot == True:
                    self.model.retry_thread_robot = False
                    print("|||||||Dentro de Estado Retry PARALELO")
                    print("Ready de Robot A: ",self.model.robots["robot_a"]["ready"])
                    print("Ready de Robot B: ",self.model.robots["robot_b"]["ready"])

                    #se regresa la variable a false, para detener al robot opuesto sin interrumpirlo
                    self.model.detener_robot_opuesto = False

                    #si hubo algún error de inserción se limpia el error
                    self.model.robots[self.module]["error"] = ""
                    publish.single(self.model.pub_topics["plc"],json.dumps({"ERROR_insertion": False}),hostname='127.0.0.1', qos = 2)

                    #Limpia el Label que indica la posición que fue MAL insertada 3 veces consecutivas
                    command = {"lbl_info1" : {"text": "", "color": "red"}}
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

                    #si hubo inserción manual se limpia la variable
                    self.model.fusible_manual = False
                    self.model.waiting_key_thread = False

                    #si ya acabó el robot principal... (este estado thread reiniciará el robot) - de lo contrario lo que reinicia al robot es el robot A, en su estado retry que reinicia ambos robots
                    if self.model.robot_principal == True:

                        print("robot principal ya terminó")

                        #se reinician ambos robots porque el robot paralelo necesita una señal del robot A estando en Home

                        #if self.module == "robot_a":
                        self.model.robothome_a = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
                        #if self.module == "robot_b":
                        self.model.robothome_b = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py

                        #self.model.robots[self.module]["ready"] = False
                        self.model.robots["robot_a"]["ready"] = False
                        self.model.robots["robot_b"]["ready"] = False

                        sleep(0.2)
                        publish.single(self.model.pub_topics["robot_b"] ,json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
                        sleep(0.4)
                        publish.single(self.model.pub_topics["robot_b"] ,json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2) 

                        sleep(0.2)
                        publish.single(self.model.pub_topics["robot_a"] ,json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
                        sleep(0.4)
                        publish.single(self.model.pub_topics["robot_a"] ,json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)                

                #set_robot solo entra cuando llega un READY del robot)
                if self.model.set_thread_robot == True:
                    self.model.set_thread_robot = False
                    print("|||||||Dentro de Estado Set PARALELO")

                    if len(self.model.robots[self.module]["queueIzq"]) or len(self.model.robots[self.module]["queueDer"]):
                        command = {
                            "lbl_result" : {"text": "Preparando robot", "color": "green"},
                            "lbl_steps" : {"text": "Por favor espere", "color": "black"}
                            }
                        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                        if self.model.robots[self.module]["ready"]:
                            self.model.robots[self.module]["ready"] = False
                            self.model.trigger_thread_robot = True
                            self.model.finish_thread_robot = False
                    #si no le quedan fusibles en cola...
                    else:
                        self.model.trigger_thread_robot = False
                        self.model.finish_thread_robot = True

                #una vez reiniciado, si no ha finalizado se va a triggers (o después de una inserción)
                if self.model.trigger_thread_robot == True:
                    self.model.trigger_thread_robot = False
                    print("|||||||Dentro de Estado Trigger PARALELO")

                    while(self.model.detener_robot_opuesto):
                        sleep(1)
                        print("esperando robot opuesto")

                    #///////////////////////////////////////////////////////////////////////
                    if self.model.acomodo_listas_2:
                        self.model.acomodo_listas_2 = False

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

                            for i in self.model.robots[self.module][queue]:    
                                # i = ["CAJA","CAVIDAD","FUSIBLE"]
                                # FUSIBLE = i[2] = ["type,amp,color"]  = ["ATO,25,white"] es un string
                                for j in range(len(robots_queue_temp)):
                                    if robots_queue_temp[j][0] == i[2]:
                                        robots_queue_temp[j].append(i)

                            for w in range(len(robots_queue_temp)):
                                robots_queue_temp[w].pop(0)
                                robots_queue_temp[w].append([len(robots_queue_temp[w])])

                            print("\n\nrobots_queue_temp FUSIBLE,FUSIBLES EN COLA: ")
                            for a in range(len(robots_queue_temp)):
                                print(robots_queue_temp[a])

                            for c in range(len(robots_queue_temp)):
                                for k in range(len(robots_queue_temp)):
                                    if robots_queue_temp[c][-1] > robots_queue_temp[k][-1]:
                                        robots_queue_temp[c],robots_queue_temp[k] = robots_queue_temp[k], robots_queue_temp[c]
            
                            print("\n\nrobots_queue_temp ORDENADOS POR CANTIDAD: ")
                            for s in range(len(robots_queue_temp)):
                                robots_queue_temp[s].pop(-1)
                                print(robots_queue_temp[s])
 

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



                            print("\n\nnew_queue: ")
                            for i in range(len(new_queue)):
                                print(new_queue[i])
        

                            self.model.robots[self.module][queue] = copy(new_queue)

                            robots_queue_temp.clear()
                            new_queue.clear()
                            queue_fusible.clear()

                            print("\n\n") #<> 

                        try:
                            encontrado = False
                            #["PDC-RMID", "RELT", "RELAY,70,gray"]
                            posicion_final = len(self.model.robots[self.module]["queueDer"]) - 1
                            elemento_final = self.model.robots[self.module]["queueDer"][int(posicion_final)]
                            print("posicion final: ", int(posicion_final))
                            print("elemento en posicion final: ",self.model.robots[self.module]["queueDer"][int(posicion_final)])

                            for elemento in self.model.robots[self.module]["queueDer"]:
                                if "RELAY,70,gray" in elemento:
                                    posicion_relay = self.model.robots[self.module]["queueDer"].index(elemento)
                                    elemento_relay = elemento
                                    print("posicion relay: ",posicion_relay)
                                    print("elemento relay: ",elemento_relay)
                                    encontrado = True

                            if encontrado:
                                self.model.robots[self.module]["queueDer"][int(posicion_final)] = elemento_relay
                                self.model.robots[self.module]["queueDer"][int(posicion_relay)] = elemento_final
                                print("intercambio realizado")
                                print("elemento nuevo en posicion media: ",self.model.robots[self.module]["queueDer"][int(posicion_final)])
                                print("elemento nuevo en posicion relay: ",self.model.robots[self.module]["queueDer"][int(posicion_relay)])
                        except:
                            pass
                    #///////////////////////////////////////////////////////////////////////
                        
                    self.queueIzq      = self.model.robots[self.module]["queueIzq"]
                    self.queueDer      = self.model.robots[self.module]["queueDer"]

                    #se selecciona la queue correspondiente a a la zona compartida para el robot actual
                    self.shared_queue = ""
                    self.mensaje_shared_response = ""
                    self.mensaje_shared_send = ""

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


                    #si aún tiene fusibles de este lado
                    if len(self.queueIzq) > 0:

                        self.model.popQueueIzq_2 = True
                        self.model.popQueueDer_2 = False

                        #if self.model.var_queue_2 == 0:
                        #    current_trig = self.model.robots[self.module]["current_trig"] = self.queueIzq[0]
                        #else:
                        #    current_trig = self.model.robots[self.module]["current_trig"] = self.queueIzq[-1]
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
                            "img_center": f"{box}2.jpg",
                            "img_fuse": "vacio2.jpg"
                            }
                        elif box == "PDC-R" and cavity == "F96":
                            box = "F96_box"
                            command = {
                            "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                            "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                            "img_center": f"{box}2.jpg",
                            "img_fuse": "vacio2.jpg"
                            }
                        elif box == "PDC-RMID":
                            if self.model.database["fuses"]["PDC-RMID"]["F96"] != "empty":
                                command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "F96_box2.JPG"
                                }
                            else:
                                command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "vacio2.jpg"
                                }
                        elif box == "PDC-R":
                            if self.model.database["fuses"]["PDC-R"]["F96"] != "empty":
                                command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "F96_box2.JPG"
                                }
                            else:
                                command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "vacio2.jpg"
                                }

                        else:
                            command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "vacio2.jpg"
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
                            #se mantiene en este while, mientras el valor de shared_zone sea el mensaje de used_by_robot_(correspondiente)
                            while(self.model.shared_zone == self.mensaje_shared_response):
                                    print("esperando a que la zona compartida se libere (current robot: thread robot)")
                                    sleep(0.5)

                            #se avisa que este robot está usando la zona compartida, no está disponible para el otro robot
                            self.model.shared_zone = self.mensaje_shared_send
                            print("self.model.shared_zone: ",self.model.shared_zone)
                            #SE MANDA MENSAJE AL ROBOT PARA IR POR ESE FUSIBLE, A ESA CAJA, A ESA CAVIDAD A INSERTAR
                            print("enviando instruccion al robot: ",self.module)
                            publish.single(self.model.pub_topics[self.module] ,json.dumps(command),hostname='127.0.0.1', qos = 2)
                        else:
                            print("enviando instruccion al robot: ",self.module)
                            publish.single(self.model.pub_topics[self.module] ,json.dumps(command),hostname='127.0.0.1', qos = 2)


                    #si acabó el lado anterior  y aún tiene fusibles de este lado
                    elif len(self.queueDer) > 0:
                        self.model.popQueueIzq_2 = False
                        self.model.popQueueDer_2 = True
                        print("+++++++++ENTRAMOS AL ELIF PARA LADO DERECHO+++++++++++++++++")


                        #if self.model.var_queue_2 == 0:
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

                        if box == "PDC-RMID" and cavity == "F96":
                            box = "F96_box"
                            command = {
                            "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                            "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                            "img_center": f"{box}2.jpg",
                            "img_fuse": "vacio2.jpg"
                            }
                        elif box == "PDC-R" and cavity == "F96":
                            box = "F96_box"
                            command = {
                            "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                            "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                            "img_center": f"{box}2.jpg",
                            "img_fuse": "vacio2.jpg"
                            }
                        elif box == "PDC-RMID":
                            if self.model.database["fuses"]["PDC-RMID"]["F96"] != "empty":
                                command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "F96_box2.JPG"
                                }
                            else:
                                command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "vacio2.jpg"
                                }
                        elif box == "PDC-R":
                            if self.model.database["fuses"]["PDC-R"]["F96"] != "empty":
                                command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "F96_box2.JPG"
                                }
                            else:
                                command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "vacio2.jpg"
                                }
                        else:
                            command = {
                                "lbl_result" : {"text": f"{fuse[0]} {fuse[1]}", "color": "green"},
                                "lbl_steps" : {"text": f"Tomando Fusible", "color": "black"},
                                "img_center": f"{box}2.jpg",
                                "img_fuse": "vacio2.jpg"
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
                            while(self.model.shared_zone == self.mensaje_shared_response):
                                    print("esperando a que la zona compartida se libere (current robot: thread robot)")
                                    sleep(0.5)

                            #se avisa que este robot está usando la zona compartida, no está disponible para el otro robot
                            self.model.shared_zone = self.mensaje_shared_send
                            print("self.model.shared_zone: ",self.model.shared_zone)
                            #SE MANDA MENSAJE AL ROBOT PARA IR POR ESE FUSIBLE, A ESA CAJA, A ESA CAVIDAD A INSERTAR
                            publish.single(self.model.pub_topics[self.module] ,json.dumps(command),hostname='127.0.0.1', qos = 2)
                        else:
                            print("enviando instruccion al robot: ",self.module)
                            publish.single(self.model.pub_topics[self.module] ,json.dumps(command),hostname='127.0.0.1', qos = 2)


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
                        publish.single(self.model.pub_topics["plc"],json.dumps(command),hostname='127.0.0.1', qos = 2)

                        #print("Enviando robot a Home - STOP - START")
                        #sleep(0.1)
                        #publish.single(self.model.pub_topics[self.module] ,json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
                        #sleep(0.1)
                        #publish.single(self.model.pub_topics[self.module] ,json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
                        #sleep(0.4)
                        #publish.single(self.model.pub_topics[self.module] ,json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)
                        #sleep(0.1)

                        command = {
                            "lbl_result" : {"text": f"Inserciones del {self.module} terminadas", "color": "green"},
                            "lbl_steps" : {"text": "", "color": "black"}
                            }
                        self.model.finish_thread_robot = True
                    
                #si llega mensaje de LOADED como respuesta del robot...
                if self.model.loaded_thread_robot == True:
                    self.model.loaded_thread_robot = False
                    print("|||||||Dentro de Estado Loaded PARALELO")

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

                #si llega mensaje de INSERTED como respuesta del robot...
                if self.model.inserted_thread_robot == True:
                    self.model.inserted_thread_robot = False
                    print("|||||||Dentro de Estado Inserted PARALELO")

                    box             = self.model.robots[self.module]["current_trig"][0]
                    cavity          = self.model.robots[self.module]["current_trig"][1]
                    value           = self.model.robots[self.module]["current_trig"][2]
                    try:

                        if box == "PDC-RMID" and cavity == "F96":
                            box = "F96_box"
                            self.model.drawBB(draw = [box, cavity], color = (0, 255, 0))
                            imwrite(self.model.imgs_path + box + "2.jpg", self.model.imgs[box])

                            command = {
                                "lbl_steps" : {"text": f"Insercion correcta en {box}: {cavity}", "color": "black"},
                                "img_center" : box + "2.jpg"
                                }
                        elif box == "PDC-R" and cavity == "F96":
                            box = "F96_box"
                            self.model.drawBB(draw = [box, cavity], color = (0, 255, 0))
                            imwrite(self.model.imgs_path + box + "2.jpg", self.model.imgs[box])

                            command = {
                                "lbl_steps" : {"text": f"Insercion correcta en {box}: {cavity}", "color": "black"},
                                "img_center" : box + "2.jpg"
                                }
                        else:
                            self.model.drawBB(draw = [box, cavity], color = (0, 255, 0))
                            imwrite(self.model.imgs_path + box + "2.jpg", self.model.imgs[box])
                            command = {
                                "lbl_steps" : {"text": f"Insercion correcta en {box}: {cavity}", "color": "black"},
                                "img_center" : box + "2.jpg",
                                "img_fuse": "vacio2.jpg"
                                }

                        #este mensaje solo se publica cuando el otro robot no entró en error
                        if self.model.detener_robot_opuesto == False:
                            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

                        # para quitar de la lista(en cola) el fusible insertado
                        self.model.robots[self.module]["current_trig"] = None

                        if self.model.popQueueIzq_2 == True and self.model.popQueueDer_2 == False:
                            #if self.model.var_queue_2 == 0:
                            #    self.model.robots[self.module]["queueIzq"].pop(0)
                            #    self.model.var_queue_2 = 1
                            #else:
                            #    self.model.robots[self.module]["queueIzq"].pop(-1)
                            #    self.model.var_queue_2 = 0
                            self.model.robots[self.module]["queueIzq"].pop(0)

                        if self.model.popQueueIzq_2 == False and self.model.popQueueDer_2 == True:
                            #if self.model.var_queue_2 == 0:
                            #    self.model.robots[self.module]["queueDer"].pop(0)
                            #    self.model.var_queue_2 = 1
                            #else:
                            #    self.model.robots[self.module]["queueDer"].pop(-1)
                            #    self.model.var_queue_2 = 0
                            self.model.robots[self.module]["queueDer"].pop(0)


                        #para reinicar contador de veces que entra a error
                        self.model.contador_error_2 = 0

                        #para regresar a triggers
                        self.model.trigger_thread_robot = True

                    except Exception as ex:
                        print("Receiver exception: ", ex)
                        command = {
                            "lbl_result" : {"text": f"ERROR: {ex.args}", "color": "red"},
                            "lbl_steps" : {"text": f"Presionar boton o girar llave", "color": "black"}
                            }
                        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                        self.model.robots[self.module]["error"] = ex.args

                        #después se requerirá otra variable para ir a receiver nok
                        self.model.trigger_thread_robot = True

                #si llega mensaje de ERROR como respuesta del robot...
                if self.model.error_thread_robot == True:
                    self.model.error_thread_robot = False
                    print("|||||||Dentro de Estado Error PARALELO")

                    #para detener al robot opuesto pero dejar que intente sus inserciones pendientes
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
                    self.model.contador_error_2 = self.model.contador_error_2 + 1
                    print("número de errores de inserción: ")
                    print(self.model.contador_error_2)

                    #en esta línea haces un publish para modificar el valor del modbus ERROR_insertion a true, indicando el error
                    publish.single(self.model.pub_topics["plc"],json.dumps({"ERROR_insertion": True}),hostname='127.0.0.1', qos = 2)

                    error = self.model.robots[self.module]["error"]

                    #si el relevador que falló fue el rosa, se irá directo al estado manual
                    if cavity == "RELX":
                        self.model.limite_reintentos_thread = True

                    elif cavity == "RELU":
                        self.model.limite_reintentos_thread = True

                    elif cavity == "RELT":
                        self.model.limite_reintentos_thread = True

                    elif self.model.contador_error_2 == self.model.max_reintentos_2:
                        self.model.limite_reintentos_thread = True

                    elif self.model.contador_error_2 < self.model.max_reintentos_2:

                        try:
                            if self.module == "robot_a":
                                self.model.robothome_a = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py

                            if self.module == "robot_b":
                                self.model.robothome_b = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
                            
                            self.model.robots[self.module]["ready"] = False
                            sleep(0.2)
                            publish.single(self.model.pub_topics[self.module] ,json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
                            sleep(0.4)
                            publish.single(self.model.pub_topics[self.module] ,json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)

                            command = {
                                "lbl_result" : {"text": f"ERROR de inserción", "color": "red"},
                                "lbl_steps" : {"text": f"Retirar fusible {box}: {cavity} y reintentar", "color": "black"}
                                }
                            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

                            try:
                                self.model.drawBB(draw = [box, cavity], color = (0, 0, 255))
                                imwrite(self.model.imgs_path + box + "2.jpg", self.model.imgs[box])

                                command = {
                                    "img_center" : box + "2.jpg"
                                    }
                                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                            except:
                                pass

                            self.model.init_thread_robot = False #Para dejar de ejecutar en paralelo al momento de realizar una mala inserción el robot B

                        except Exception as ex:
                            print("ERROR exception: ", ex)

                #si se excedió el limite de errores se habilita limite_reintentos_thread en el if anterior
                if self.model.limite_reintentos_thread == True:
                    self.model.limite_reintentos_thread = False
                    print("|||||||Dentro de Estado Limite Reintentos PARALELO")

                    box = self.model.robots[self.module]["current_trig"][0]
                    cavity = self.model.robots[self.module]["current_trig"][1]
                    fuse = self.model.robots[self.module]["current_trig"][2].split(sep = ",") # ["type", "current", "color"]
                    fusetemp = []
                    fusetemp = fuse
                    if box == "PDC-RMID" and cavity == "F96":
                        box = "F96_box"
                    if box == "PDC-R" and cavity == "F96":
                        box = "F96_box"
                    if "REL" in cavity:
                        if "60" in fuse[1]:
                            fusetemp[1] = "RELAY_132"
                        elif "70" in fuse[1]:
                            fusetemp[1] = "RELAY_112"

                    #se guarda el número de intentos que lleva este fusible
                    reintentos = self.model.retries[box][cavity]

                    #dibujar un box de color naranja para esta cavidad
                    self.model.drawBB(draw = [box, cavity], color = (0, 128, 255))
                    imwrite(self.model.imgs_path + box + "2.jpg", self.model.imgs[box])

                    #se reinicia el contador de intentos para fusible
                    self.model.contador_error_2 = 0


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
                                "img_center" : box + "2.jpg"
                                }

                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    #bandera para funcionamiento de la llave sin mensaje de confirmación
                    self.model.fusible_manual = True
                    self.model.waiting_key_thread = True
                    #Para dejar de ejecutar en paralelo al momento de realizar una mala inserción el robot B
                    self.model.init_thread_robot = False 

                #si se da llave después de haber estado en modo inserción manual
                if self.model.llave_thread == True:
                    self.model.llave_thread = False
                    self.model.waiting_key_thread = False
                    print("|||||||Dentro de Estado Llave PARALELO")

                    self.model.robots[self.module]["current_trig"] = None

                    if self.model.popQueueIzq_2 == True and self.model.popQueueDer_2 == False:
                        #if self.model.var_queue_2 == 0:
                        #    self.model.robots[self.module]["queueIzq"].pop(0)
                        #    self.model.var_queue_2 = 1
                        #else:
                        #    self.model.robots[self.module]["queueIzq"].pop(-1)
                        #    self.model.var_queue_2 = 0
                        self.model.robots[self.module]["queueIzq"].pop(0)

                    if self.model.popQueueIzq_2 == False and self.model.popQueueDer_2 == True:
                        #if self.model.var_queue_2 == 0:
                        #    self.model.robots[self.module]["queueDer"].pop(0)
                        #    self.model.var_queue_2 = 1
                        #else:
                        #    self.model.robots[self.module]["queueDer"].pop(-1)
                        #    self.model.var_queue_2 = 0
                        self.model.robots[self.module]["queueDer"].pop(0)
                    
                    command = {
                                "lbl_result" : {"text": f"Fusible insertado manualmente.", "color": "green"},
                                "lbl_steps" : {"text": f"Continuando con siguiente insercion.", "color": "blue"}
                                }

                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    self.model.retry_thread_robot = True

                #se manda una variable en true para finalizar este thread
                if self.model.finish_thread_robot == True:
                    self.model.finish_thread_robot = False
                    print("|||||||Dentro de Estado Finish PARALELO")

                    #variable que termina el ciclo cuando se está esperando a este robot
                    self.model.thread_robot = True
                    #se apaga el init_thread para dejar de estar ejecutando en paralelo
                    self.model.init_thread_robot = False

            else:

                #necesario para recibir los mensajes de robot_b en modo un robot
                self.model.current_thread_robot = ""

        


class MyThreadTimer(QThread):

    def __init__(self, module = "Thread", model = None, client = None, parent = QObject):
        super().__init__(parent)
        self.model  = model
        self.module = module
        self.client = client
        
        print("se crea un objeto de la clase MyThread con padre QThread")
        print("con entrada del objeto model de la clase model que está en model.py")
        print("y el objeto client de la clase MqttClient que está en comm.py")
        
    def run(self):
        
        ejecution_timer = 0

        while 1:

            sleep(1)
            print("ejecutando thread")
            command = {
                    "lbl_nuts" : {"text": f"Tiempo de ejecución:\n{ejecution_timer} segundos", "color": "blue"},
                    }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

            ejecution_timer = ejecution_timer + 1
            sleep(1)

            print("ejecutando thread")
            command = {
                    "lbl_nuts" : {"text": f"Tiempo de ejecución:\n{ejecution_timer} segundos", "color": "cyan"},
                    }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            ejecution_timer = ejecution_timer + 1