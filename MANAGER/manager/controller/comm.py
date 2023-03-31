from PyQt5.QtCore import QObject, pyqtSignal, QTimer
from paho.mqtt.client import Client
from threading import Timer
from copy import copy
########### MODIFICACION ########### 
from time import sleep
########### MODIFICACION ########### 
import json

class MqttClient (QObject):
    conn_ok         =   pyqtSignal()
    conn_nok        =   pyqtSignal()
    clamp           =   pyqtSignal()
    emergency       =   pyqtSignal()
    recovery        =   pyqtSignal()
    key             =   pyqtSignal()
    retry_btn       =   pyqtSignal()
    login           =   pyqtSignal()
    logout          =   pyqtSignal()
    config          =   pyqtSignal()
    config_ok       =   pyqtSignal()
    ID              =   pyqtSignal()
    code            =   pyqtSignal()
    visible         =   pyqtSignal()
    pose            =   pyqtSignal()
    loaded          =   pyqtSignal()
    color_rsp       =   pyqtSignal()
    error           =   pyqtSignal()
    inserted        =   pyqtSignal()
    start           =   pyqtSignal()
    ready           =   pyqtSignal()
    available       =   pyqtSignal()
    F4              =   pyqtSignal()
    CTRL            =   pyqtSignal()
    retry_traza     =   pyqtSignal()
    continue_traza  =   pyqtSignal()

    ra_home    = ""
    rb_home    = ""

    nido_PDCD = ""
    nido_PDCP = ""
    nido_PDCR = ""
    nido_PDCS = ""
    nido_TBLU = ""

    # 1 para PDCRMID, 0 para PDCR
    nido_PDCRMID = 1

    raffiPDCD = 0
    raffiPDCP = 0
    raffiPDCR = 0
    raffiPDCS = 0
    raffiTBLU = 0

    color_PDCD = "blue"
    color_PDCP = "blue"
    color_PDCR = "blue"
    color_PDCS = "blue"
    color_TBLU = "blue"

    keyboard_key = ""
    keyboard_value = False
    llave = False

    ############## Código para F96; Descomentar cuando se haya acondicionado de manera física lo necesario para su funcionamiento ##############
    #nido_F96 = ""
    #raffiF96 = 0
    #color_F96 = "blue"
    ############## Código para F96; Descomentar cuando se haya acondicionado de manera física lo necesario para su funcionamiento ##############


    puertaA = ""
    puertaB = ""
    puertaC = ""

    cortina = ""

    plural = ""


    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.client = Client()

    def setup(self):
        try:
            self.client.on_connect = self.on_connect
            self.client.on_message = self.on_message
            self.client.connect(host = "127.0.0.1", port = 1883, keepalive = 60)
            self.client.loop_start()
        except Exception as ex:
            print("Manager MQTT client connection fail. Exception: ", ex)

    def stop (self):
        self.client.loop_stop()
        self.client.disconnect()
        
    def reset (self):
        self.stop()
        self.setup()

    def on_connect(self, client, userdata, flags, rc):
        try:
            connections = {
               "correct": True,
               "fails": "" 
               }
            for topic in self.model.sub_topics:
                client.subscribe(self.model.sub_topics[topic])
                if rc == 0:
                    print(f"Manager MQTT client connected to {topic} with code [{rc}]")
                else:
                    connections["correct"] = False
                    connection["fails"] += topic + "\n"
                    print("Manager MQTT client connection to " + topic + " fail, code [{}]".format(rc))
            if connections["correct"] == True:
               self.conn_ok.emit()
            else:
                print("Manager MQTT client connections fail:\n" + connection["fails"])
                self.conn_nok.emit()
        except Exception as ex:
            print("Manager MQTT client connection fail. Exception: ", ex)
            self.conn_nok.emit()


################################################################################
            
    #def reiniciar_robots(self):
    #                    print("Encendiendo Robots")
    #                    self.client.publish(self.model.pub_topics["plc"],json.dumps({"RobotsOFF": False}), qos = 2)
    #                    print("RobotsOFF : False")
    #                    command ={
    #                        "lbl_nuts" : {"text": "  F1: Enviar a Home\nF12: Reiniciar Robots", "color": "purple"}
    #                         }
    #                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

    #def robots_home(self):
    #    command ={
    #            "lbl_nuts" : {"text": "  F1: Enviar a Home\nF12: Reiniciar Robots", "color": "purple"}
    #                }
    #    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

    def thread_triggers_off(self):
        self.model.retry_thread_robot       = False
        self.model.set_thread_robot         = False
        self.model.trigger_thread_robot     = False
        self.model.loaded_thread_robot      = False
        self.model.inserted_thread_robot    = False
        self.model.error_thread_robot       = False
        self.model.limite_reintentos_thread = False
        self.model.llave_thread             = False

################################################################################
    #se ejecuta cada que entra un mensaje MQTT nuevo (secuencial pero pueden llegar al mismo tiempo)
    def on_message(self, client, userdata, message): 
        try:
            payload = json.loads(message.payload) #se define el mensaje MQTT como un json, 
            #message es un objeto naturalmente dentro del mensaje MQTT de la librería PahoMQTT
            #payload es un diccionario, json.loads te permite convertir el arreglo de bits que recibes a un diccionario
            #print message.payload te imprimiría un binario o algo así (aunque phyton lo interpretaría por ser python)
            print ("   " + message.topic + " ", payload) #payload puede ser string, arreglo de bits, jason etc...
            # "  " solo son espacios para poder distinguir mejor en la terminal (una sangría)
            #payload: carga del apartado mensaje, el contenido que trae el mensaje que puede ser de diferentes maneras
            if message.topic == self.model.sub_topics["plc"]:
                if "emergency" in payload:
                    self.model.plc["emergency"] = payload["emergency"]
                    #"llave" plc, llave emergency
                    #cambias el "valor" de la llave de tu modelo, por el valor de la llave que leíste en el json
                    #siempre se trata a los diccionarios como pares "llave-valor"
                    if payload["emergency"] == False:
                        self.emergency.emit()
                        #emit puede verse como un refresh a donde está la conexión (bandera que avisa que pasó algo)

                        #estos emit están ligados gracias a  "emergency   =   pyqtSignal()", entonces 
                        #al emitir una señal, otros objetos en el programa pueden visualizar estas modificaciones

                        command = { #creas un diccionario command, con un valor string
                            "popOut":"Paro de emergencia activado"
                            }                       
                        #mandas un mensaje MQTT al topico self.model.pub_topics["gui"]
                        #que podría ser simplemente un string tal que... "plc/1/etc/gui"
                        #,json.dumps(command) es para convertir el diccionario en json,
                        #porque json es un string y requiere de cierto formato por eso dumps
                        #qos 0,1 o 2, Calidad de la comunicación (PahoMQTT - 0 manda y no le interesa si lo recibieron 
                        #quienes están suscritos, 1 quiere decir que espera que el broker le conteste al cliente y le diga
                        #que lo mandó a los suscritos, 2 te aseguras que llegue a brokker y los otros clientes que 
                        #recibieron el mensaje contestan que lo recibieron, 2 garantizar que llegó, y se reintenta
                        #y si no marca un error.

                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                        #QTimer, cuentan ciclos de ejecución (se ejecuta en el mismo hilo)

                        #Timer, dealy, espera cierto tiempo (abre hilo en paralelo)
                        #y luego ejecuta (objeto de python están más chidos)
                        Timer(0.05, self.model.log, args = ("STOP",)).start()

                        #esperar 0.05 segundos , luego llamar al metodo log del modelo "callback",
                        #luego los argumentos que te llevas al método, y el start para que inicie esto

                    else:
                        self.closePopout()
                        self.recovery.emit()
                        Timer(0.05, self.model.log, args = (last_log,)).start()

            if self.model.plc["emergency"] == False:
                return # return PARA QUE YA NO SE EJECUTE NADA SI PRESIONASTE EL STOP 
                       # que se encuentra dentro del topico del PLC

            if message.topic == self.model.sub_topics["plc"]:

                if "key" in payload:
                    if payload["key"] == True:
                        # si la variable es True, quiere decir que ya pasaron varios reintentos y se requiere llave de calidad para continua
                        if self.model.fusible_manual == True:

                            if self.model.waiting_key_thread == True:
                                self.thread_triggers_off()
                                self.model.llave_thread = True
                                self.model.init_thread_robot = True #porque se vuelve false cada que hay un error en el robot paralelo, esta línea es necesaria para reactivar el reobot paralelo si el otro robot ya terminó.
                                print("self.model.init_thread_robot = ",self.model.init_thread_robot)
                                self.retry_btn.emit()
                            else:
                                self.key.emit() 
                            
                        # si la variable es False, quiere decir que estás en otra parte del proceso y la llave reiniciará el ciclo
                        elif self.model.fusible_manual == False:
                            command = {"popOut":"¿Seguro que desea dar llave al CICLO?\nPresione Esc. para salir,\nSpace/Start para continuar..."}
                            self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                            #variable de la clase MQTT para habilitar las funciones del teclado
                            self.llave = True

                if "retry_btn" in payload:
                    self.model.plc["retry_btn"] = bool(payload["retry_btn"])
                    if payload["retry_btn"] == True:

                        #si hubo problema en la publicación final de resultados de trazabilidad de ciclo...
                        if self.model.problema_trazabilidad == True:
                            self.model.problema_trazabilidad = False
                            print("problema_trazabilidad = True, se hace false y se emite señal de reintentar")
                            self.retry_traza.emit()

                        else:

                            #si se espera el botón del robot A
                            if self.model.waiting_button_inserted_singal["robot_a"] == True:
                                self.model.waiting_button_inserted_singal["robot_a"] = False

                                #si no está activada la variable en ningún robot, se borra el label
                                if self.model.waiting_button_inserted_singal["robot_a"] == False and self.model.waiting_button_inserted_singal["robot_b"] == False:
                                    command = {"lbl_info0" : {"text": "close", "color": "red"}}
                                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                                print("se valida inserción de robot_a y se manda un stop start")

                                self.client.publish(self.model.pub_topics["robot_a"],json.dumps({"command": "stop"}), qos = 2)
                                sleep(0.4)
                                self.client.publish(self.model.pub_topics["robot_a"],json.dumps({"command": "start"}), qos = 2)

                                if self.model.current_thread_robot == "robot_a":
                                    self.model.init_thread_robot = True
                                    print("init_thread_robot = ",self.model.init_thread_robot)
                                    print("self.model.inserted_thread_robot = True para robot_a")
                                    self.model.inserted_thread_robot = True
                                    print("retry_btn pra robot_b emit()")
                                    self.retry_btn.emit()
                                else:
                                    print("inserted para robot_a emit()")
                                    self.inserted.emit()
                                    #apagar todos los triggers de robot paralelo
                                    self.thread_triggers_off()
                                    #encender estado retry de robot paralelo
                                    print("self.model.retry_thread_robot = True robot_b")
                                    self.model.retry_thread_robot = True

                                    #si el robot principal ya terminó:
                                    if self.model.robot_principal == True:
                                        self.model.init_thread_robot = True #porque se vuelve false cada que hay un error en el robot paralelo, esta línea es necesaria para reactivar el reobot paralelo si el otro robot ya terminó.
                                        print("self.model.robot_principal = ",self.model.robot_principal)
                                        print("self.model.init_thread_robot = ",self.model.init_thread_robot)

                            #si la señal de espera de botón del robot B es true, y el robot A ya finalizó sus inserciones...
                            elif self.model.waiting_button_inserted_singal["robot_b"] == True and self.model.robot_a_terminado == True:
                                self.model.waiting_button_inserted_singal["robot_b"] = False

                                #si no está activada la variable en ningún robot, se borra el label
                                if self.model.waiting_button_inserted_singal["robot_a"] == False and self.model.waiting_button_inserted_singal["robot_b"] == False:
                                    command = {"lbl_info0" : {"text": "close", "color": "red"}}
                                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                                print("se valida inserción de Relay de robot_b y se manda un stop start")

                                self.client.publish(self.model.pub_topics["robot_b"],json.dumps({"command": "stop"}), qos = 2)
                                sleep(0.4)
                                self.client.publish(self.model.pub_topics["robot_b"],json.dumps({"command": "start"}), qos = 2)

                                if self.model.current_thread_robot == "robot_b":
                                    self.model.init_thread_robot = True
                                    print("init_thread_robot = ",self.model.init_thread_robot)
                                    self.model.inserted_thread_robot = True
                                    print(" self.model.inserted_thread_robot = ", self.model.inserted_thread_robot)
                                    print("retry_btn para robot_a emit()")
                                    self.retry_btn.emit()
                                else:
                                    print("inserted para robot_b emit()")
                                    self.inserted.emit()
                                    #apagar todos los triggers de robot paralelo
                                    self.thread_triggers_off()
                                    #encender estado retry de robot paralelo
                                    print("self.model.retry_thread_robot = True para robot_a")
                                    self.model.retry_thread_robot = True

                                    #si el robot principal ya terminó:
                                    if self.model.robot_principal == True:
                                        self.model.init_thread_robot = True #porque se vuelve false cada que hay un error en el robot paralelo, esta línea es necesaria para reactivar el reobot paralelo si el otro robot ya terminó.
                                        print("self.model.robot_principal = ",self.model.robot_principal)
                                        print("self.model.init_thread_robot = ",self.model.init_thread_robot)
                            
                            #si la señal de espera de botón del robot B es true, y el robot A NO ha finalizado sus inserciones...
                            elif self.model.waiting_button_inserted_singal["robot_b"] == True and self.model.robot_a_terminado == False:
                                
                                print("NO MOVER ROBOT B")
                                #apagar todos los triggers de robot paralelo
                                self.thread_triggers_off()
                                print("retry_btn emit() para robotA")
                                self.retry_btn.emit()

                            #Funcionamiento Normal si no se ha activado ninguna variable de espera de botón...
                            else:

                                #apagar todos los triggers de robot paralelo
                                self.thread_triggers_off()
                                #encender estado retry de robot paralelo
                                self.model.retry_thread_robot = True
                                print("self.model.retry_thread_robot: ",self.model.retry_thread_robot)

                                #si el robot principal ya terminó:
                                if self.model.robot_principal == True:
                                    self.model.init_thread_robot = True #porque se vuelve false cada que hay un error en el robot paralelo, esta línea es necesaria para reactivar el reobot paralelo si el otro robot ya terminó.
                                    print("self.model.robot_principal = ",self.model.robot_principal)
                                    print("self.model.init_thread_robot = ",self.model.init_thread_robot)
                        
                                print("retry_btn emit()")
                                self.retry_btn.emit()

                #se crea una lista en self.model.plc["clamps"] donde se van agregando o
                #quitando elementos para saber si en ese momento están o no clampeadas las cajas
                for i in list(payload): #list(payload) es una lista de un diccionario, te devuelve una lista con todas las keys del diccionario
                    if "clamp_" in i:
                        box = i[6:]
                        #esto es porque clamp_PDC-R en GDI aplica para R y RMID
                        if self.model.pdcr_mid and box == "PDC-R":
                            box = "PDC-RMID"
                        #si el valor de la llave es true, por ejemplo "clamp_PDC-D" = true
                        if payload[i] == True:
                            #si aún no se agrega, agregar caja a la lista de cajas clampeadas correctamente
                            if not(box in self.model.plc["clamps"]):
                                #instrucción para agregar esa caja a la lista de cajas ya clampeadas
                                self.model.plc["clamps"].append(box)
                                #emitir la señal de que se acacaba de agregar caja, o sea que se clampeo una correctamente
                                self.clamp.emit() 
                        else:
                            if box in self.model.plc["clamps"]:
                                #.pop para quitar elementos de una lista
                                #.index(box) te dice cuál elemento de la lista es el que equivale a box
                                # por ejemplo si box = PDC-P, entonces en la lista [PDC-D,PDCP,...] sabes que
                                # el indice sería el número 1 (PDC-D es el número 0)
                                self.model.plc["clamps"].pop(self.model.plc["clamps"].index(box))

                if "start" in payload:
                    if payload["start"] == True:

                        #solo se puede modificar antes de iniciar el ciclo
                        if self.model.robots_mode == 0:
                            self.model.robots_mode = 2
                            print("self.model.robots_mode: ",self.model.robots_mode)

                        #se emite el start
                        self.start.emit()

                        #si se dio llave, dar start acepta la llave y se cierra el popout
                        if self.llave == True:
                            command = {"popOut":"close"}
                            self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                            self.key.emit()
                            self.thread_triggers_off()
                            print("key emit")
                            self.llave = False
                
                if "error" in payload:              # Esta línea nunca entra, ya que solo entraría a
                                                    # una etiqueta específica llamada "error" en el plc
                    #self.model.plc["error"] = payload["error"]
                    #self.error.emit()
                    print("entro en error avisado por el plc")

                ##############################################################################################
                payload_str = json.dumps(payload)       # convertir diccionario payload a string y guardarlo

                if "raffi_PDCD" in payload_str:
                    if payload["raffi_PDCD"] == True:   # si se presiona el raffi
                        if self.raffiPDCD == 1:         # si el valor guardado era 1
                            self.raffiPDCD = 0          # se actualiza raffi a 0
                        elif self.raffiPDCD == 0:       # si el valor guardado era 0
                            self.raffiPDCD = 1          # se actualiza raffi a 1

                if "raffi_PDCP" in payload_str:
                    if payload["raffi_PDCP"] == True:
                        if self.raffiPDCP == 1:
                            self.raffiPDCP = 0
                        elif self.raffiPDCP == 0:
                            self.raffiPDCP = 1

                if "raffi_PDCR" in payload_str:
                    if payload["raffi_PDCR"] == True:
                        if self.raffiPDCR == 1:
                            self.raffiPDCR = 0
                        elif self.raffiPDCR == 0:
                            self.raffiPDCR = 1

                if "raffi_PDCS" in payload_str:
                    if payload["raffi_PDCS"] == True:
                        if self.raffiPDCS == 1:
                            self.raffiPDCS = 0
                        elif self.raffiPDCS == 0:
                            self.raffiPDCS = 1

                if "raffi_TBLU" in payload_str:
                    if payload["raffi_TBLU"] == True:
                        if self.raffiTBLU == 1:
                            self.raffiTBLU = 0
                        elif self.raffiTBLU == 0:
                            self.raffiTBLU = 1
                ############## Código para F96; Descomentar cuando se haya acondicionado de manera física lo necesario para su funcionamiento ##############
                #if "raffi_F96" in payload_str:
                #    if payload["raffi_F96"] == True:
                #        if self.raffiF96 == 1:
                #            self.raffiF96 = 0
                #        elif self.raffiF96 == 0:
                #            self.raffiF96 = 1
                ############## Código para F96; Descomentar cuando se haya acondicionado de manera física lo necesario para su funcionamiento ##############

                #if "PDC-D" or "raffi_PDCD" in payload_str: #(or para busqueda de palabras)
                if "PDC-D" in payload_str: #busca en el string PDC-D
                    if "PDC-D" in payload:
                        if payload["PDC-D"] == True:
                            self.nido_PDCD = "PDC-D:\n Habilitada"
                            self.color_PDCD = "blue"
                            self.raffiPDCD = 0 # se reinicia el raffi a 0 (desactivado)
                        if payload["PDC-D"] == False:
                            self.nido_PDCD = ""
                            self.color_PDCD = "blue"
                            self.raffiPDCD = 0 # se reinicia el raffi a 0 (desactivado)
                    if "PDC-D_ERROR" in payload:
                        if payload["PDC-D_ERROR"] == True:
                            self.nido_PDCD = "PDC-D:\n clampeo incorrecto"
                            self.color_PDCD = "red"
                    if "clamp_PDC-D" in payload:
                        if payload["clamp_PDC-D"] == True:
                            self.nido_PDCD = "PDC-D:\n clampeo correcto"
                            self.color_PDCD = "green"
                            self.raffiPDCD = 0 # se reinicia el raffi a 0 (desactivado)

                    if "PDC-D" in self.nido_PDCD: # si nido esta habilitado, correcto o incorrecto
                        if self.raffiPDCD == 1:
                            self.nido_PDCD = "PDC-D:\n raffi activado"
                            self.color_PDCD = "orange"

                    command = {
                                "lbl_box1" : {"text": f"{self.nido_PDCD}", "color": f"{self.color_PDCD}"}
                                #,"lbl_box6" : {"text": f"RAFFI: {self.raffiPDCD}", "color": "black"}
                              }
                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                if "PDC-P" in payload_str:
                    if "PDC-P" in payload:
                        if payload["PDC-P"] == True:
                            self.nido_PDCP = "PDC-P:\n Habilitada"
                            self.color_PDCP = "blue"
                            self.raffiPDCP = 0 # se reinicia el raffi a 0 (desactivado)
                        if payload["PDC-P"] == False:
                            self.nido_PDCP = ""
                            self.color_PDCP = "blue"
                            self.raffiPDCP = 0 # se reinicia el raffi a 0 (desactivado)
                    if "PDC-P_ERROR" in payload:
                        if payload["PDC-P_ERROR"] == True:
                            self.nido_PDCP = "PDC-P:\n clampeo incorrecto"
                            self.color_PDCP = "red"
                    if "clamp_PDC-P" in payload:
                        if payload["clamp_PDC-P"] == True:
                            self.nido_PDCP = "PDC-P:\n clampeo correcto"
                            self.color_PDCP = "green"
                            self.raffiPDCP = 0 # se reinicia el raffi a 0 (desactivado)
                    if "PDC-P" in self.nido_PDCP: # si nido esta habilitado, correcto o incorrecto
                        if self.raffiPDCP == 1:
                            self.nido_PDCP = "PDC-P:\n raffi activado"
                            self.color_PDCP = "orange"

                    command = {
                                "lbl_box2" : {"text": f"{self.nido_PDCP}", "color": f"{self.color_PDCP}"}
                              }
                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                if "PDC-R" in payload_str:
                    if "PDC-R" in payload:
                        self.nido_PDCRMID = 0
                        if payload["PDC-R"] == True:
                            self.nido_PDCR = "PDC-R:\n Habilitada"
                            self.color_PDCR = "blue"
                            self.raffiPDCR = 0 # se reinicia el raffi a 0 (desactivado)

                        if payload["PDC-R"] == False:
                            self.nido_PDCR = ""
                            self.color_PDCR = "blue"
                            self.raffiPDCR = 0 # se reinicia el raffi a 0 (desactivado)

                    if "PDC-RMID" in payload:
                        self.nido_PDCRMID = 1
                        if payload["PDC-RMID"] == True:
                            self.nido_PDCR = "PDC-RMID:\n Habilitada"
                            self.color_PDCR = "blue"
                            self.raffiPDCR = 0 # se reinicia el raffi a 0 (desactivado)

                        if payload["PDC-RMID"] == False:
                            self.nido_PDCR = ""
                            self.color_PDCR = "blue"
                            self.raffiPDCR = 0 # se reinicia el raffi a 0 (desactivado)

                    if "PDC-R_ERROR" in payload:
                        if payload["PDC-R_ERROR"] == True:
                            self.color_PDCR = "red"
                            if self.nido_PDCRMID == 0:
                                self.nido_PDCR = "PDC-R:\n clampeo incorrecto"
                            elif self.nido_PDCRMID == 1:
                                self.nido_PDCR = "PDC-RMID:\n clampeo incorrecto"
                    if "clamp_PDC-R" in payload:
                        if payload["clamp_PDC-R"] == True:
                            self.color_PDCR = "green"
                            self.raffiPDCR = 0 # se reinicia el raffi a 0 (desactivado)
                            if self.nido_PDCRMID == 0:
                                self.nido_PDCR = "PDC-R:\n clampeo correcto"
                            elif self.nido_PDCRMID == 1:
                                self.nido_PDCR = "PDC-RMID:\n clampeo correcto"
                    if "PDC-R" in self.nido_PDCR: # si nido esta habilitado, correcto o incorrecto
                        if self.raffiPDCR == 1:
                            if self.nido_PDCRMID == 0:
                                self.nido_PDCR = "PDC-R:\n raffi activado"
                            elif self.nido_PDCRMID == 1:
                                self.nido_PDCR = "PDC-RMID:\n raffi activado"
                            self.color_PDCR = "orange"       

                    command = {
                              "lbl_box3" : {"text": f"{self.nido_PDCR}", "color": f"{self.color_PDCR}"}
                            }

                    #buscar el F96 en cualquiera de las 3 cajas posibles de PDC-R
                    if "F96" in self.model.database["fuses"]["PDC-RS"]:
                        if self.model.database["fuses"]["PDC-RS"]["F96"] != "empty":
                                    print("MODELO DE FUSIBLES EN COMM: ",self.model.database["fuses"])
                                    print("PDC-RS SI LLEVA EL NUEVO CONECTOR")
                                    command = {
                                                "lbl_box3" : {"text": f"{self.nido_PDCR}", "color": f"{self.color_PDCR}"},
                                                "lbl_box7" : {"text": "F96: Si Aplica", "color": "purple"}
                                              }

                    if "F96" in self.model.database["fuses"]["PDC-RMID"]:
                        if self.model.database["fuses"]["PDC-RMID"]["F96"] != "empty":
                                    print("MODELO DE FUSIBLES EN COMM: ",self.model.database["fuses"])
                                    print("PDC-RMID SI LLEVA EL NUEVO CONECTOR")
                                    command = {
                                                "lbl_box3" : {"text": f"{self.nido_PDCR}", "color": f"{self.color_PDCR}"},
                                                "lbl_box7" : {"text": "F96: Si Aplica", "color": "purple"}
                                              }

                    if "F96" in self.model.database["fuses"]["PDC-R"]:
                        if self.model.database["fuses"]["PDC-R"]["F96"] != "empty":
                                    print("MODELO DE FUSIBLES EN COMM: ",self.model.database["fuses"])
                                    print("PDC-R SI LLEVA EL NUEVO CONECTOR")
                                    command = {
                                                "lbl_box3" : {"text": f"{self.nido_PDCR}", "color": f"{self.color_PDCR}"},
                                                "lbl_box7" : {"text": "F96: Si Aplica", "color": "purple"}
                                              }
                    print("command: ")
                    print(command)
                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                    if self.nido_PDCR == "":
                        command = {"lbl_box7" : {"text": "", "color": "blue"}}
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
   
                if "PDC-S" in payload_str:
                    if "PDC-S" in payload:
                        if payload["PDC-S"] == True:
                            self.nido_PDCS = "PDC-S:\n Habilitada"
                            self.color_PDCS = "blue"
                            self.raffiPDCS = 0 # se reinicia el raffi a 0 (desactivado)
                        if payload["PDC-S"] == False:
                            self.nido_PDCS = ""
                            self.color_PDCS = "blue"
                            self.raffiPDCS = 0 # se reinicia el raffi a 0 (desactivado)
                    if "PDC-S_ERROR" in payload:
                        if payload["PDC-S_ERROR"] == True:
                            self.nido_PDCS = "PDC-S:\n clampeo incorrecto"
                            self.color_PDCS = "red"
                    if "clamp_PDC-S" in payload:
                        if payload["clamp_PDC-S"] == True:
                            self.nido_PDCS = "PDC-S:\n clampeo correcto"
                            self.color_PDCS = "green"
                            self.raffiPDCS = 0 # se reinicia el raffi a 0 (desactivado)
                    if "PDC-S" in self.nido_PDCS: # si nido esta habilitado, correcto o incorrecto
                        if self.raffiPDCS == 1:
                            self.nido_PDCS = "PDC-S:\n raffi activado"
                            self.color_PDCS = "orange"

                    command = {
                                "lbl_box4" : {"text": f"{self.nido_PDCS}", "color": f"{self.color_PDCS}"}
                              }
                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                if "TBLU" in payload_str:
                    if "TBLU" in payload:
                        if payload["TBLU"] == True:
                            self.nido_TBLU = "TBLU:\n Habilitada"
                            self.color_TBLU = "blue"
                            self.raffiTBLU = 0 # se reinicia el raffi a 0 (desactivado)
                        if payload["TBLU"] == False:
                            self.nido_TBLU = ""
                            self.color_TBLU = "blue"
                            self.raffiTBLU = 0 # se reinicia el raffi a 0 (desactivado)
                    if "TBLU_ERROR" in payload:
                        if payload["TBLU_ERROR"] == True:
                            self.nido_TBLU = "TBLU:\n clampeo incorrecto"
                            self.color_TBLU = "red"
                    if "clamp_TBLU" in payload:
                        if payload["clamp_TBLU"] == True:
                            self.nido_TBLU = "TBLU:\n clampeo correcto"
                            self.color_TBLU = "green"
                            self.raffiTBLU = 0 # se reinicia el raffi a 0 (desactivado)
                    if "TBLU" in self.nido_TBLU: # si nido esta habilitado, correcto o incorrecto
                        if self.raffiTBLU == 1:
                            self.nido_TBLU = "TBLU:\n raffi activado"
                            self.color_TBLU = "orange"

                    command = {
                                "lbl_box5" : {"text": f"{self.nido_TBLU}", "color": f"{self.color_TBLU}"}
                              }
                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                ############## Código para F96; Descomentar cuando se haya acondicionado de manera física lo necesario para su funcionamiento ##############
                #if "F96" in payload_str:
                #    if "F96" in payload:
                #        if payload["F96"] == True:
                #            self.nido_F96 = "F96:\n Habilitada"
                #            self.color_F96 = "blue"
                #            self.raffiF96 = 0 # se reinicia el raffi a 0 (desactivado)
                #        if payload["F96"] == False:
                #            self.nido_F96 = ""
                #            self.color_F96 = "blue"
                #            self.raffiF96 = 0 # se reinicia el raffi a 0 (desactivado)
                #    if "F96_ERROR" in payload:
                #        if payload["F96_ERROR"] == True:
                #            self.nido_F96 = "F96:\n clampeo incorrecto"
                #            self.color_F96 = "red"
                #    if "clamp_F96" in payload:
                #        if payload["clamp_F96"] == True:
                #            self.nido_F96 = "F96:\n clampeo correcto"
                #            self.color_F96 = "green"
                #            self.raffiF96 = 0 # se reinicia el raffi a 0 (desactivado)
                #    if "F96" in self.nido_F96: # si nido esta habilitado, correcto o incorrecto
                #        if self.raffiF96 == 1:
                #            self.nido_F96 = "F96:\n raffi activado"
                #            self.color_F96 = "orange"
                #
                #    command = {
                #                "lbl_box5" : {"text": f"{self.nido_F96}", "color": f"{self.color_F96}"}
                #              }
                #    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                ############## Código para F96; Descomentar cuando se haya acondicionado de manera física lo necesario para su funcionamiento ##############
                
                if "ERROR" in payload_str:
                    if "ERROR_cortina" in payload: # para payload, tiene que ser exactamente la llave del diccionario
                        if payload["ERROR_cortina"] == True:
                            self.cortina = "CORTINA \n INTERRUMPIDA"
                        if payload["ERROR_cortina"] == False:
                            self.cortina = ""

                if "INTERLOCK" in payload_str:              
                    if "INTERLOCK_A" in payload:
                        if payload["INTERLOCK_A"] == True:
                            self.puertaA = "|A|"
                        if payload["INTERLOCK_A"] == False:
                            self.puertaA = ""
                    if "INTERLOCK_B" in payload:
                        if payload["INTERLOCK_B"] == True:
                            self.puertaB = "|B|"
                        if payload["INTERLOCK_B"] == False:
                            self.puertaB = ""
                    if "INTERLOCK_C" in payload:
                        if payload["INTERLOCK_C"] == True:
                            self.puertaC = "|C|"
                        if payload["INTERLOCK_C"] == False:
                            self.puertaC = ""
                    
                    if self.puertaA == "|A|" and self.puertaB == "|B|":
                        self.plural = "S"
                    elif self.puertaA == "|A|" and self.puertaC == "|C|":
                        self.plural = "S"
                    elif self.puertaB == "|B|" and self.puertaC == "|C|":
                        self.plural = "S"
                    else:
                        self.plural = ""

                if self.puertaA == "" and self.puertaB == "" and self.puertaC == "":
                    command = {"lbl_info4" : {"text": f"{self.cortina}", "color": "red"}}
                else:
                    command = {"lbl_info4" : {"text": f"PUERTA{self.plural} \n ABIERTA{self.plural}:\n {self.puertaA} {self.puertaB} {self.puertaC}", "color": "red"}}
                self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

            ##############################################################################################
            if message.topic == self.model.sub_topics["keyboard"]:
                #ejemplo de mensaje: { "keyboard_E" : true }
                payload_str = json.dumps(payload)       # convertir diccionario payload a string y guardarlo
                payload_str = payload_str.replace("{","")
                payload_str = payload_str.replace("}","")
                payload_str = payload_str.replace('"',"")
                payload_str = payload_str.replace("true","True")
                payload_str = payload_str.replace("false","False")
                payload_str = payload_str.replace(" ","")
                separate_msj = payload_str.rsplit(":")

                self.keyboard_key = separate_msj[0]
                self.keyboard_value = eval(separate_msj[1])

                #print("key: ",self.keyboard_key)
                #print("value: ",self.keyboard_value)

                if self.llave == True:

                    if self.keyboard_key == "keyboard_esc":
                        command = {"popOut":"close"}
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                        print("key no emit")
                    elif self.keyboard_key == "keyboard_space":
                        command = {"popOut":"close"}
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                        self.key.emit()
                        self.thread_triggers_off()
                        print("key emit")
                    else:
                        command = {"popOut":"Mensaje no recibido, gire la llave nuevamente"}
                        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)


                    self.llave = False

                #if self.keyboard_key == "keyboard_F1":
                #    print("Enviando robot a Home")
                #    command ={
                #            "lbl_nuts" : {"text": "  F1: Enviar a Home\nF12: Reiniciar Robots", "color": "green"}
                #             }
                #    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                #    sleep(0.2)
                #    self.client.publish(self.model.pub_topics["robot_a"],json.dumps({"command": "stop"}), qos = 2)
                #    sleep(0.2)
                #    self.client.publish(self.model.pub_topics["robot_b"],json.dumps({"command": "stop"}), qos = 2)
                #    sleep(0.4)
                #    self.client.publish(self.model.pub_topics["robot_a"],json.dumps({"command": "start"}), qos = 2)
                #    sleep(0.4)
                #    self.client.publish(self.model.pub_topics["robot_b"],json.dumps({"command": "start"}), qos = 2)

                #    Timer(1.5, self.robots_home).start()
                    

                #if self.keyboard_key == "keyboard_F12":
                #    command ={
                #            "lbl_nuts" : {"text": "  F1: Enviar a Home\nF12: Reiniciar Robots", "color": "green"}
                #             }
                #    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                #    print("Apagando Robots")
                #    self.client.publish(self.model.pub_topics["plc"],json.dumps({"RobotsOFF": True}), qos = 2)
                #    print("RobotsOFF : True")

                #    Timer(10, self.reiniciar_robots).start()

                if self.keyboard_key == "keyboard_F4":
                    #solo se puede modificar antes de iniciar el ciclo
                    if self.model.robots_mode == 0:
                        self.model.robots_mode = 1
                        print("self.model.robots_mode keyboard_F4: ",self.model.robots_mode)
                    self.F4.emit()

                if self.keyboard_key == "keyboard_ctrl":
                    
                    if self.model.problema_trazabilidad == True:
                        self.model.problema_trazabilidad = False
                        print("problema_trazabilidad = True, se hace false y se emite señal de continuar")
                        self.continue_traza.emit()
                    else:

                        #solo se puede modificar antes de iniciar el ciclo
                        if self.model.robots_mode == 0:
                            self.model.robots_mode = 2
                            print("self.model.robots_mode keyboard_ctrl: ",self.model.robots_mode)
                        self.CTRL.emit()
                
            if message.topic == self.model.sub_topics["gui"]:
                if "request" in payload:
                    self.model.gui["request"] = payload["request"]
                    if payload["request"] == "login":
                        self.login.emit()
                    elif payload["request"] == "logout":
                        self.logout.emit()
                    elif payload["request"] == "config":
                        self.config.emit()
                if "ID" in payload:
                    self.model.gui["ID"] = payload["ID"].upper()
                    self.ID.emit()
                if "code" in payload:
                    self.model.gui["code"] = payload["code"].upper()
                    self.code.emit()
                if "visible" in payload:
                    self.model.gui["visible"] = payload["visible"]
                    self.visible.emit()

            if message.topic == self.model.sub_topics["config"]:
                if "finish" in payload:
                    if payload["finish"] == True:
                        self.config_ok.emit()
                if "shutdown" in payload:
                    if payload["shutdown"] == True:
                        self.model.shutdown = True 

            if message.topic == self.model.sub_topics["robot_a"]:
                ###############################################################
                payload_str = json.dumps(payload) 
                if self.model.robothome_a == True:
                            self.ra_home = "ESPERE ROBOT A"
                            command = {"lbl_box6" : {"text": f"{self.ra_home} {self.rb_home}", "color": "black"}}
                            self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                if "HOME" in payload_str:
                    self.ra_home = ""
                    command = {"lbl_box6" : {"text": f"{self.ra_home} {self.rb_home}", "color": "black"}}
                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                    #hacer false variable para esperar el true y mostrar el mensaje cuando se envíe a home
                    self.model.robothome_a = False
                ###############################################################

                if "response" in payload:
                    if type(payload["response"]) is str:
                        self.model.robots["robot_a"]["pose"] = payload["response"]
                        self.pose.emit()

                        if "TIEMPO" in payload["response"]:

                        #    ##### Mensajes para el Tiempo recopilado por el robot #####
                        #    #current_trig_RA = self.model.robots["robot_a"]["queueIzq"][0] para ambos robots se recorre primero esta lista izquierda
                        #    #current_trig_RA = self.model.robots["robot_a"]["queueDer"][0] y posteriormente la lista derecha

                        #    #puede haber casos en que los mensajes vengan juntos, para esto se revisa el número de mensajes que vienen pegados:
                        #    #ejemplo*         {"response": "TIEMPO_TRASLADO_TOMA: 5.55 s\r\nTIEMPO_BAJADA_TOMA: 5.55 s\r\n"}

                        #    mensajes = []
                        #    mensajes.clear()
                        #    copia_mensaje = payload["response"]

                        #    #['TIEMPO_TRASLADO_TOMA: 5.55 ', 'TIEMPO_BAJADA_TOMA: 5.55 ', '']
                        #    tratamiento_mensaje =  copia_mensaje.split("s\r\n")
                        #    for i in range(len(tratamiento_mensaje)-1):
                        #        mensajes.append(tratamiento_mensaje[i])
                                    

                        #    #print("mensajes: ", mensajes)
                        #    for w in mensajes:

                        #        #Se divide el mensaje mediante la palabra "TIEMPO" ({"response": "TIEMPO_TRASLADO_TOMA: 5.55 s\r\n"})
                        #        separation = w.split("TIEMPO") #Da como resultado : ["","_TRASLADO_TOMA: 5.55 s\r\n"]
                        #        #print("Separaciones por TIEMPO: ",separation)
                        #        separation = "TIEMPO" + separation[1] #"TIEMPO"+"_TRASLADO_TOMA: 5.55 s\r\n"

                        #        separation = separation.split(":") #["TIEMPO_TRASLADO_TOMA"," 5.55 s\r\n"]
                        #        separationKey = separation[0] #"TIEMPO_TRASLADO_TOMA"
                        #        #print("Key: ",separationKey)
                        #        separationValue = separation[1].split(" ") #['', '5.55', 's\r\n']
                        #        separationValue = separationValue[1] # 5.55
                        #        separationValue = float(separationValue) #Se convierte a flotante
                        #        #print("Valor: ",separationValue)

                        #        #print("Len de current_trig_RA IZQUIERDO: ",len(self.model.robots["robot_a"]["queueIzq"]))
                        #        #print("Len de current_trig_RA DERECHO: ",len(self.model.robots["robot_a"]["queueDer"]))
                            
                        #        #Si la queue Izquierda para el robot A aún tiene elementos:
                        #        if len(self.model.robots["robot_a"]["queueIzq"]) > 0:
                        #            #print("##### Robot A Queue Izquierda #####\n")
                        #            cavidadActual = self.model.robots["robot_a"]["queueIzq"][0][1]
                        #            #print("Cavidad Actual: ",cavidadActual)
                        #            #Si el fusible en cola, es igual al fusible actual en la variable de self.model.insertion_times:
                        #            if cavidadActual in self.model.insertion_times:
                        #                #print("Mismo Trigger o Cavidad")
                        #                # Si el tiempo que llega para ese fusible ya tiene un valor en la variable de self.model.insertion_times, se va sumando:
                        #                if separationKey in self.model.insertion_times[cavidadActual]:
                        #                    #print("Se va sumando")
                        #                    self.model.insertion_times[cavidadActual][separationKey] = self.model.insertion_times[cavidadActual][separationKey]+separationValue
                        #                #Si el tiempo que llega es nuevo para ese fusible:
                        #                else:
                        #                    self.model.insertion_times[cavidadActual][separationKey] = separationValue
                        #            #Si el fusible en cola es diferente al fusible actual en la variable de self.model.insertion_times:
                        #            else:
                        #                #print("Trigger o Cavidad Nuevo")
                        #                self.model.insertion_times[cavidadActual] = {}
                        #                self.model.insertion_times[cavidadActual][separationKey] = separationValue
                        #        #Si la queue Izquierda YA NO tiene elementos, se pasa a la queue DERECHA:
                        #        elif len(self.model.robots["robot_a"]["queueDer"]) > 0:
                        #            #print("##### Robot A Queue Derecha #####\n")
                        #            cavidadActual = self.model.robots["robot_a"]["queueDer"][0][1]
                        #            #print("Cavidad Actual: ",cavidadActual)
                        #            #Si el fusible en cola, es igual al fusible actual en la variable de self.model.insertion_times:
                        #            if cavidadActual in self.model.insertion_times:
                        #                #print("Mismo Trigger o Cavidad")
                        #                # Si el tiempo que llega para ese fusible ya tiene un valor en la variable de self.model.insertion_times, se va sumando:
                        #                if separationKey in self.model.insertion_times[cavidadActual]:
                        #                    #print("Se va sumando")
                        #                    self.model.insertion_times[cavidadActual][separationKey] = self.model.insertion_times[cavidadActual][separationKey]+separationValue
                        #                #Si el tiempo que llega es nuevo para ese fusible:
                        #                else:
                        #                    self.model.insertion_times[cavidadActual][separationKey] = separationValue
                        #            #Si el fusible en cola es diferente al fusible actual en la variable de self.model.insertion_times:
                        #            else:
                        #                #print("Trigger o Cavidad Nuevo")
                        #                self.model.insertion_times[cavidadActual] = {}
                        #                self.model.insertion_times[cavidadActual][separationKey] = separationValue

                        #        #Si ambas queues del robot están vacías (terminó todas sus inserciones):
                        #        else:
                        #            print("########Ya no hay fusibles para este robot########")
                        #        if separationKey == "TIEMPO_SUBIDA_INSERCION":
                        #            print("Aquí finaliza el trigger")
                        #        #print("+*+*+*+*#####self.model.insertion_times: ",self.model.insertion_times)
                            pass
                        if "LOADED" in payload["response"]:
                            if self.model.current_thread_robot == "robot_a":
                                self.model.loaded_thread_robot = True
                            else:
                                self.loaded.emit()
                        if "TAKE_AVAILABLE" in payload["response"]:
                            if self.model.current_thread_robot == "robot_a":
                                print("self.available.emit() from robot_a")
                                self.available.emit()
                            else:
                                print("self.model.shared_zone = available from robot_a")
                                self.model.shared_zone = "available"
                        if "INSERTED" in payload["response"]:

                            if self.model.waiting_button_inserted_singal["robot_a"] == True: #esto es para cuando se inserte con la estación funcione igual
                                self.model.waiting_button_inserted_singal["robot_a"] = False
                                #si no está activada la variable en ningún robot, se borra el label
                                if self.model.waiting_button_inserted_singal["robot_a"] == False and self.model.waiting_button_inserted_singal["robot_b"] == False:
                                    command = {"lbl_info0" : {"text": "close", "color": "red"}}
                                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                            if self.model.current_thread_robot == "robot_a":
                                self.model.inserted_thread_robot = True
                            else:
                                self.inserted.emit()
                        if "READY" in payload["response"]:
                            if self.model.waiting_button_inserted_singal["robot_a"] == False:
                                print("READY recibido porque self.model.waiting_button_inserted_singal[robot_a] = False")
                                self.model.robots["robot_a"]["ready"] = True
                                #esto hace que continúe y vuelva a pedir un trigger del robot
                                if self.model.current_thread_robot == "robot_a":
                                    self.model.set_thread_robot = True
                                else:
                                    self.ready.emit()
                        if "ERROR" in payload["response"]:

                            #solamente marca el error de inserción cuando no se trata de una inserción manual, de otra forma el robot 
                            #intenta la inserción pero si no se completa, se quedará esperando botón
                            if self.model.waiting_button_inserted_singal["robot_a"] == False:
                                self.model.robots["robot_a"]["error"] = payload["response"].rsplit("_",1)[1]
                                if self.model.current_thread_robot == "robot_a":
                                    self.thread_triggers_off()
                                    self.model.error_thread_robot = True
                                else:
                                    self.error.emit()
                            #si la variable es true, pero se detectó un mensaje de ERROR de inserción del Robot, se guarda el registro de ese ERROR
                            else:
                                box = self.model.robots["robot_a"]["current_trig"][0]
                                cavity = self.model.robots["robot_a"]["current_trig"][1]
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

            if message.topic == self.model.sub_topics["robot_b"]:
                ###############################################################
                payload_str = json.dumps(payload) 
                if self.model.robothome_b == True:
                            self.rb_home = "\n ESPERE ROBOT B"
                            command = {"lbl_box6" : {"text": f"{self.ra_home} {self.rb_home}", "color": "black"}}
                            self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                if "HOME" in payload_str:
                    self.rb_home = ""
                    command = {"lbl_box6" : {"text": f"{self.ra_home} {self.rb_home}", "color": "black"}}
                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)
                    #hacer false variable para esperar el true y mostrar el mensaje cuando se envíe a home
                    self.model.robothome_b = False
                ###############################################################
                if "response" in payload:
                    if type(payload["response"]) is str:
                        self.model.robots["robot_b"]["pose"] = payload["response"]
                        self.pose.emit()

                        if "TIEMPO" in payload["response"]:

                        #    ##### Mensajes para el Tiempo recopilado por el robot #####
                        #    #current_trig_RB = self.model.robots["robot_b"]["queueIzq"][0] para ambos robots se recorre primero esta lista izquierda
                        #    #current_trig_RB = self.model.robots["robot_b"]["queueDer"][0] y posteriormente la lista derecha

                        #    #puede haber casos en que los mensajes vengan juntos, para esto se revisa el número de mensajes que vienen pegados:
                        #    #ejemplo*         {"response": "TIEMPO_TRASLADO_TOMA: 5.55 s\r\nTIEMPO_BAJADA_TOMA: 5.55 s\r\n"}

                        #    mensajes = []
                        #    mensajes.clear()
                        #    copia_mensaje = payload["response"]

                        #    #['TIEMPO_TRASLADO_TOMA: 5.55 ', 'TIEMPO_BAJADA_TOMA: 5.55 ', '']
                        #    tratamiento_mensaje =  copia_mensaje.split("s\r\n")
                        #    for i in range(len(tratamiento_mensaje)-1):
                        #        mensajes.append(tratamiento_mensaje[i])
                                    

                        #    #print("mensajes: ", mensajes)
                        #    for w in mensajes:

                        #        #Se divide el mensaje mediante la palabra "TIEMPO" ({"response": "TIEMPO_TRASLADO_TOMA: 5.55 s\r\n"})
                        #        separation = w.split("TIEMPO") #Da como resultado : ["","_TRASLADO_TOMA: 5.55 s\r\n"]
                        #        separation = "TIEMPO" + separation[1] #"TIEMPO"+"_TRASLADO_TOMA: 5.55 s\r\n"

                        #        separation = separation.split(":") #["TIEMPO_TRASLADO_TOMA"," 5.55 s\r\n"]
                        #        separationKey = separation[0] #"TIEMPO_TRASLADO_TOMA"
                        #        #print("Key: ",separationKey)
                        #        separationValue = separation[1].split(" ") #['', '5.55', 's\r\n']
                        #        separationValue = separationValue[1] # 5.55
                        #        separationValue = float(separationValue) #Se convierte a flotante
                        #        #print("Valor: ",separationValue)

                        #        #print("Len de current_trig_RB IZQUIERDO: ",len(self.model.robots["robot_b"]["queueIzq"]))
                        #        #print("Len de current_trig_RB DERECHO: ",len(self.model.robots["robot_b"]["queueDer"]))
                            
                        #        #Si la queue Izquierda para el robot A aún tiene elementos:
                        #        if len(self.model.robots["robot_b"]["queueIzq"]) > 0:
                        #            #print("##### Robot B Queue Izquierda #####\n")
                        #            cavidadActual = self.model.robots["robot_b"]["queueIzq"][0][1]
                        #            #print("Cavidad Actual: ",cavidadActual)
                        #            #Si el fusible en cola, es igual al fusible actual en la variable de self.model.insertion_times:
                        #            if cavidadActual in self.model.insertion_times:
                        #                #print("Mismo Trigger o Cavidad")
                        #                # Si el tiempo que llega para ese fusible ya tiene un valor en la variable de self.model.insertion_times, se va sumando:
                        #                if separationKey in self.model.insertion_times[cavidadActual]:
                        #                    #print("Se va sumando")
                        #                    self.model.insertion_times[cavidadActual][separationKey] = self.model.insertion_times[cavidadActual][separationKey]+separationValue
                        #                #Si el tiempo que llega es nuevo para ese fusible:
                        #                else:
                        #                    self.model.insertion_times[cavidadActual][separationKey] = separationValue
                        #            #Si el fusible en cola es diferente al fusible actual en la variable de self.model.insertion_times:
                        #            else:
                        #                #print("Trigger o Cavidad Nuevo")
                        #                self.model.insertion_times[cavidadActual] = {}
                        #                self.model.insertion_times[cavidadActual][separationKey] = separationValue
                        #        #Si la queue Izquierda YA NO tiene elementos, se pasa a la queue DERECHA:
                        #        elif len(self.model.robots["robot_b"]["queueDer"]) > 0:
                        #            #print("##### Robot B Queue Derecha #####\n")
                        #            cavidadActual = self.model.robots["robot_b"]["queueDer"][0][1]
                        #            #print("Cavidad Actual: ",cavidadActual)
                        #            #Si el fusible en cola, es igual al fusible actual en la variable de self.model.insertion_times:
                        #            if cavidadActual in self.model.insertion_times:
                        #                #print("Mismo Trigger o Cavidad")
                        #                # Si el tiempo que llega para ese fusible ya tiene un valor en la variable de self.model.insertion_times, se va sumando:
                        #                if separationKey in self.model.insertion_times[cavidadActual]:
                        #                    #print("Se va sumando")
                        #                    self.model.insertion_times[cavidadActual][separationKey] = self.model.insertion_times[cavidadActual][separationKey]+separationValue
                        #                #Si el tiempo que llega es nuevo para ese fusible:
                        #                else:
                        #                    self.model.insertion_times[cavidadActual][separationKey] = separationValue
                        #            #Si el fusible en cola es diferente al fusible actual en la variable de self.model.insertion_times:
                        #            else:
                        #                #print("Trigger o Cavidad Nuevo")
                        #                self.model.insertion_times[cavidadActual] = {}
                        #                self.model.insertion_times[cavidadActual][separationKey] = separationValue

                        #        #Si ambas queues del robot están vacías (terminó todas sus inserciones):
                        #        else:
                        #            print("########Ya no hay fusibles para este robot########")
                        #        if separationKey == "TIEMPO_SUBIDA_INSERCION":
                        #            print("Aquí finaliza el trigger")
                            pass
                        if "LOADED" in payload["response"]:
                            if self.model.current_thread_robot == "robot_b":
                                self.model.loaded_thread_robot = True
                            else:
                                self.loaded.emit()
                        if "TAKE_AVAILABLE" in payload["response"]:
                            if self.model.current_thread_robot == "robot_b":
                                print("self.available.emit() from robot_b")
                                self.available.emit()
                            else:
                                print("self.model.shared_zone = available from robot_b")
                                self.model.shared_zone = "available"       
                        if "INSERTED" in payload["response"]:
                            if self.model.waiting_button_inserted_singal["robot_b"] == True: #esto es para cuando se inserte con la estación funcione igual
                                self.model.waiting_button_inserted_singal["robot_b"] = False
                                #si no está activada la variable en ningún robot, se borra el label
                                if self.model.waiting_button_inserted_singal["robot_a"] == False and self.model.waiting_button_inserted_singal["robot_b"] == False:
                                    command = {"lbl_info0" : {"text": "close", "color": "red"}}
                                    self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

                            if self.model.current_thread_robot == "robot_b":
                                self.model.inserted_thread_robot = True
                            else:
                                self.inserted.emit()
                            print("Inserción por robot no válida, debe ser por botón")
                        if "READY" in payload["response"]:
                            if self.model.waiting_button_inserted_singal["robot_b"] == False:
                                print("READY recibido porque self.model.waiting_button_inserted_singal[robot_b] = False")
                                self.model.robots["robot_b"]["ready"] = True
                                if self.model.current_thread_robot == "robot_b":
                                    #esto hace que continúe y vuelva a pedir un trigger del robot
                                    self.model.set_thread_robot = True
                                else:
                                    self.ready.emit()
                        if "ERROR" in payload["response"]:
                            #solamente marca el error de inserción cuando no se trata de una inserción manual, de otra forma el robot 
                            #intenta la inserción pero si no se completa, se quedará esperando botón
                            if self.model.waiting_button_inserted_singal["robot_b"] == False:
                                self.model.robots["robot_b"]["error"] = payload["response"].rsplit("_",1)[1]
                                if self.model.current_thread_robot == "robot_b":
                                    self.thread_triggers_off()
                                    self.model.error_thread_robot = True
                                else:
                                    self.error.emit()
                            #si la variable es true, pero se detectó un mensaje de ERROR de inserción del Robot, se guarda el registro de ese ERROR
                            else:
                                box = self.model.robots["robot_b"]["current_trig"][0]
                                cavity = self.model.robots["robot_b"]["current_trig"][1]
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

        except Exception as ex:
            print("input exception", ex)

    def closePopout (self):
        command = {
            "popOut":"close"
            }
        self.client.publish(self.model.pub_topics["gui"],json.dumps(command), qos = 2)

if __name__ == "__main__":
    from PyQt5.QtWidgets import QApplication
    from controller.model import model
    import sys
    app = QApplication(sys.argv)
    model = model.manager()
    client = mqttClient(model)
    sys.exit(app.exec_())

