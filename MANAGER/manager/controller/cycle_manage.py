from PyQt5.QtCore import QObject, QState, pyqtSlot, pyqtSignal
from datetime import datetime
from paho.mqtt import publish
from threading import Timer
########### MODIFICACION ########### 
from time import sleep
from openpyxl import Workbook, load_workbook #crear un excel
from openpyxl.utils import get_column_letter #obtener columna de excel
from time import strftime #para obtener hora actual y fecha actual gg
########### MODIFICACION ########### 
from os.path import exists
from time import strftime
from pickle import load
from cv2 import imread
from os import system
from copy import copy
import requests
import json

from admin import Admin       

class Startup(QState):
    ok  = pyqtSignal()

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, event):
        Timer(0.05, self.model.log, args = ("STARTUP",)).start()
        if self.model.local_data["user"]["type"] != "":
            Timer(0.05, self.logout, args = (copy(self.model.local_data["user"]),)).start()
        command = {
            "lbl_info0" : {"text": "close", "color": "black"},
            "lbl_info1" : {"text": "", "color": "black"},
            #"lbl_info2" : {"text": "", "color": "green"}, #debe ir comentado para evitar que se reinicie el mensaje de fusibles que faltan por rellenar
            "lbl_info3" : {"text": "", "color": "black"},
            "lbl_info4" : {"text": "", "color": "black"},
            "lbl_nuts" : {"text": "", "color": "purple"},
            #"lbl_nuts" : {"text": "  F1: Enviar a Home\nF12: Reiniciar Robots", "color": "purple"},
            ##############################################
            "lbl_box1"  : {"text": "", "color": "black"},
            "lbl_box2"  : {"text": "", "color": "black"},
            "lbl_box3"  : {"text": "", "color": "black"},
            "lbl_box4"  : {"text": "", "color": "black"},
            "lbl_box5"  : {"text": "", "color": "black"},
            "lbl_box6"  : {"text": "", "color": "black"},
            "lbl_box7"  : {"text": "", "color": "black"}, ######### Modificación para F96 #########
            ##############################################
            "lbl_result" : {"text": "Se requiere un login para continuar", "color": "green"},
            "lbl_steps" : {"text": "Ingresa tu código de acceso", "color": "black"},
            "lbl_user" : {"type":"", "user": "", "color": "black"},
            "img_user" : "blanco.jpg",
            "img_nuts" : "blanco.jpg",
            "img_center" : "logo.jpg",
            "img_fuse": "vacio2.jpg",
            "show":{"scanner": False}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        #self.hideSoftware()
        #Timer(1, self.hideSoftware).start()
        Timer(1, self.kioskMode).start()

        if exists("data\config"):
            with open("data\config", "rb") as f:
                data = load(f)
                self.model.config_data.update(data)
        print("\nConfig:\n", self.model.config_data, "\n")

        ##############
        ##############
        self.ok.emit()
        ##############
        ##############

    def kioskMode(self):
        system("taskkill /f /im explorer.exe")

    def hideSoftware(self):
        publish.single("System",json.dumps({"window" : False}),hostname='127.0.0.1', qos = 2)
        #publish.single("visycam/set",json.dumps({"window" : False}),hostname='127.0.0.1', qos = 2)

    def logout(self, user):
        try:
            Timer(0.05, self.model.log, args = ("LOGOUT",)).start() 
            data = {
                "NOMBRE": self.model.local_data["user"]["name"],
                "GAFET": self.model.local_data["user"]["pass"],
                "TIPO": self.model.local_data["user"]["type"],
                "SESION": "LOGOUT",
                "FECHA": datetime.now().isoformat()
                }
            resp = requests.post(f"http://{self.model.server}/api/post/manager", data=json.dumps(data))
        except Exception as ex:
            print("Logout Exception: ", ex)
        finally:
            self.model.local_data["user"]["type"] = ""
            self.model.local_data["user"]["name"] = ""
            self.model.local_data["user"]["pass"] = ""

class Login (QState):
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model
    def onEntry(self, event):
        command = {
            "show":{"login": True},
            "allow_close": True
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

class CheckLogin (QState):
    ok      = pyqtSignal()
    nok     = pyqtSignal()

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, event):
        command = {
            "lbl_result" : {"text": "ID recibido", "color": "green"},
            "lbl_steps" : {"text": "Validando usuario...", "color": "black"},
            "show":{"login": False}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        Timer(0.05,self.API_requests).start()

    def API_requests (self):
        try:
            endpoint = ("http://{}/api/get/usuarios/GAFET/=/{}/ACTIVO/=/1".format(self.model.server, self.model.gui["ID"]))
            response = requests.get(endpoint).json()
    
            if "ACTIVO" in response and response["ACTIVO"]:
                self.model.local_data["user"]["type"] = response["TIPO"][0]
                self.model.local_data["user"]["name"] = response["NOMBRE"][0]
                self.model.local_data["user"]["pass"] = copy(self.model.gui["ID"][0])
                data = {
                    "NOMBRE": self.model.local_data["user"]["name"],
                    "GAFET": self.model.local_data["user"]["pass"],
                    "TIPO": self.model.local_data["user"]["type"],
                    "SESION": "LOGIN",
                    "FECHA": datetime.now().isoformat()
                    }
                resp = requests.post(f"http://{self.model.server}/api/post/manager", data=json.dumps(data))
                command = {
                    "lbl_user" : {
                        "type":self.model.local_data["user"]["type"],
                        "user": self.model.local_data["user"]["name"], 
                        "color": "black"
                        },
                    "img_user" : self.model.local_data["user"]["name"] + ".jpg"
                    }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                Timer(0.05, self.model.log, args = ("LOGIN",)).start()
                self.ok.emit()
            else:
                 command = {
                    "lbl_result" : {"text": "Intentalo de nuevo", "color": "green"},
                    "lbl_steps" : {"text": "Ingresa tu código de acceso", "color": "black"}
                    }
                 publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                 self.nok.emit()
        except Exception as ex:
            print("Login request exception: ", ex)
            command = {
                "lbl_result" : {"text": "Intentalo de nuevo", "color": "red"},
                "lbl_steps" : {"text": "Ingresa tu código de acceso", "color": "black"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.nok.emit()

class StartCycle (QState):
    ok = pyqtSignal()
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, event):
        #limpiar variable para caja anterior que pasó
        self.model.reset()

        #se reinicia variable que dice que el robot A finalizó
        self.model.robot_a_terminado = False

        Timer(1, self.robots_home).start()
        Timer(0.05, self.model.log, args = ("IDLE",)).start() 
        command = {
            "lbl_info0" : {"text": "close", "color": "red"},
            "lbl_info1" : {"text": "", "color": "black"},
            #"lbl_info2" : {"text": "", "color": "green"},
            "lbl_info3" : {"text": "", "color": "black"},
            "lbl_nuts" : {"text": "", "color": "purple"},
            #"lbl_nuts" : {"text": "  F1: Enviar a Home\nF12: Reiniciar Robots", "color": "purple"},
            #############################################
            "lbl_box1" : {"text": "", "color": "orange"},
            "lbl_box2" : {"text": "", "color": "orange"},
            "lbl_box3" : {"text": "", "color": "orange"},
            "lbl_box4" : {"text": "", "color": "orange"},
            "lbl_box5" : {"text": "", "color": "orange"},
            "lbl_box6" : {"text": "", "color": "orange"},
            "lbl_box7" : {"text": "", "color": "orange"},######### Modificación para F96 #########
            #############################################
            "lbl_result" : {"text": "Nuevo ciclo, Coloca las cajas. Seleccionar:", "color": "green"},
            "lbl_steps" : {"text": '"CTRL" / "START" para DOS Robots; "F4" para UN Robot', "color": "black"},
            "img_nuts" : "blanco.jpg",
            "img_center" : "logo.jpg",
            "img_fuse": "vacio2.jpg",
            "allow_close": False,
            "cycle_started": False,
            "statusBar": "clear"
            }

        if self.model.shutdown == True:
            Timer(0.05, self.logout, args = (self.model.local_data["user"],)).start()
            command["lbl_result"] = {"text": "Apagando equipo...", "color": "green"}
            command["lbl_steps"] = {"text": ""}
            command["shutdown"] = True
            Timer(3, self.clamps_release).start()
        if self.model.config_data["trazabilidad"] == True:
            command["lbl_info3"] = {"text": "Trazabilidad\nActivada", "color": "green"}
        else:
            command["lbl_info3"] = {"text": "Trazabilidad\nDesactivada", "color": "red"}
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
      
    def robots_home (self):
        ########### MODIFICACION ###########
        self.model.robothome_a = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
        self.model.robothome_b = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
        #Enviar 2 stop, para asegurar y después con un start el robot debe ir solo a Home
        publish.single(self.model.pub_topics["robot_a"],json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
        sleep(0.3)
        publish.single(self.model.pub_topics["robot_b"],json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
        sleep(0.3)
        publish.single(self.model.pub_topics["robot_a"],json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
        sleep(0.3)
        publish.single(self.model.pub_topics["robot_b"],json.dumps({"command": "stop"}),hostname='127.0.0.1', qos = 2)
        sleep(0.3)
        publish.single(self.model.pub_topics["robot_a"],json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)
        sleep(0.3)
        publish.single(self.model.pub_topics["robot_b"],json.dumps({"command": "start"}),hostname='127.0.0.1', qos = 2)
        ########### MODIFICACION ###########
        #publish.single(self.model.pub_topics["robot_a"],json.dumps({"trigger": "HOME"}),hostname='127.0.0.1', qos = 2)
        #publish.single(self.model.pub_topics["robot_b"],json.dumps({"trigger": "HOME"}),hostname='127.0.0.1', qos = 2)

    def clamps_release(self):
        command = {}
        for i in self.model.fuses_BB:
            command[i] = False
        command["ERROR_insertion"] = False
        publish.single(self.model.pub_topics["plc"],json.dumps(command),hostname='127.0.0.1', qos = 2)

    def logout(self, user):
        try:
            Timer(0.05, self.model.log, args = ("LOGOUT",)).start() 
            data = {
                "NOMBRE": self.model.local_data["user"]["name"],
                "GAFET": self.model.local_data["user"]["pass"],
                "TIPO": self.model.local_data["user"]["type"],
                "SESION": "LOGOUT",
                "FECHA": datetime.now().isoformat()
                }
            resp = requests.post(f"http://{self.model.server}/api/post/manager", data=json.dumps(data))
        except Exception as ex:
            print("Logout Exception: ", ex)

    def onExit(self, QEvent):
        command = {
            "lbl_result" : {"text": "Nidos activados", "color": "green"},
            "lbl_steps" : {"text": "Escanea el DATAMATRIX", "color": "black"},
            "cycle_started": True
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

class Config (QState):
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.admin = None

    def onEntry(self, event):
        Timer(0.05, self.model.log, args = ("CONFIG",)).start() 
        admin = Admin(data = self.model)
        command = {
            "lbl_result" : {"text": "Sistema en configuración", "color": "green"},
            "lbl_steps" : {"text": "Ciclo de operación deshabilitado", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

class ScanQr (QState):
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, event):
        command = {
            "show":{"scanner": True}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        #Se comenta para editar el clampeo antes de identificar el arnés a trabajar.
        #command = {}
        #for i in self.model.fuses_BB:
        #    if "PDC-R" in i:
        #        command[i] = False
        #    else:
        #        command[i] = True
        #publish.single(self.model.pub_topics["plc"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        Timer(0.05, self.model.log, args = ("RUNNING",)).start()

    def onExit(self, QEvent):
        command = {
            "show":{"scanner": False}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

class StandbyTraza (QState):
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, event):
        print("Estado: StandbyTraza, esperando señal de ctrl o start para continuar")

class CheckQr (QState):

    ok_F4   = pyqtSignal()
    ok_CTRL   = pyqtSignal()
    ok_MANUAL = pyqtSignal() 

    nok     = pyqtSignal()
    rework  = pyqtSignal()

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, event):
        command = {
            "lbl_result" : {"text": "Datamatrix escaneado", "color": "green"},
            "lbl_steps" : {"text": "Validando", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        Timer(0.05, self.API_requests).start()

    def API_requests (self):
        try:
            print("Estado de Sistema de Trazabilidad: ",self.model.config_data["trazabilidad"])
            orden = None
            dbEvent = None
            coincidencias = 0
            self.model.codes["FET"] = self.model.gui["code"]
            temp = self.model.gui["code"].split (" ")
            self.model.codes["HM"] = "--"
            self.model.codes["REF"] = "--"
            #correct_lbl = False
            correct_lbl = True
            for i in temp:
                if "HM" in i:
                    self.model.codes["HM"] = i
                    
                    if "HM000000011936" in i:
                        self.model.config_data["trazabilidad"] = False
                        
                    if "HM000000011925" in i:
                        self.model.config_data["trazabilidad"] = False

                    if "HM000000011920" in i:
                        self.model.config_data["trazabilidad"] = False


                    if self.model.config_data["trazabilidad"] == False:
                        command = {
                            "lbl_info3" : {"text": "Trazabilidad\nDesactivada", "color": "red"}
                        }
                        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)


                if "IL" in i or "IR" in i:
                    self.model.codes["REF"] = i
                if "EL." in i:
                    correct_lbl = True
            if not(correct_lbl):
                command = {
                        "lbl_result" : {"text": "Datamatrix incorrecto", "color": "red"},
                        "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                        }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                self.nok.emit()
                return

            #### Trazabilidad FAMX2
            if self.model.config_data["trazabilidad"]:
                try:
                    print("||||||||||||Consulta de HM a FAMX2...")
                    endpoint = "http://{}/seghm/get/seghm/NAMEPREENSAMBLE/=/INTERIOR/HM/=/{}".format(self.model.server,self.model.codes["HM"])
                    famx2response = requests.get(endpoint).json()
                    print("Respuesta de FAMX2: \n",famx2response)
                    #No existen coincidencias del HM en FAMX2
                    if "items" in famx2response:
                        print("ITEMS por que no se encontraron coincidencias en FAMX2")
                        command = {
                            "lbl_result" : {"text": "HM no registrado en Sistema de Trazabilidad", "color": "red"},
                            "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                            }
                        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                        self.nok.emit()
                        return
                    #Si existe el HM en FAMX2
                    else:
                        print("FAMX2 Salida de Torque: \n",famx2response["SALTORQUE"])
                        print("FAMX2 Ubicación: \n",famx2response["UBICACION"])
                        famx2response["UBICACION"] = famx2response["UBICACION"].replace(" ","")
                        print("FAMX2 Ubicación sin espacios: \n",famx2response["UBICACION"])

                        #Si la columna que indica la hora de salida de TORQUE, es diferente a None, significa que completó esa estación y SI puede entrar a Inserción.
                        if famx2response["SALTORQUE"] != None: #AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
                            print("El arnés ya salió de TORQUE")
                            #La ubicación debe ser "SALIDA_DE_TORQUE"
                            if famx2response["UBICACION"] == "SALIDA_DE_TORQUE" or famx2response["UBICACION"] == "ENTRADA_A_INSERCION":

                                #Se guarda el id del arnés de FAMX2 en el modelo para realizar updates en el servidor de FAMX2.
                                self.model.id_HM = famx2response["id"]
                                self.model.datetime = datetime.now()
                                #### Trazabilidad FAMX2 Update de Información
                                print("||Realizando el Update de ENTRADA a Trazabilidad en FAMX2")
                                print("ID a la que se realizará el Update para Trazabilidad",self.model.id_HM)

                                entTrazabilidad = {
                                    "ENTINSERCION": self.model.datetime.strftime("%Y/%m/%d %H:%M:%S"),
                                    "UBICACION": "ENTRADA_A_INSERCION",
                                    "NAMEINSERCION": self.model.no_serie
                                    }

                                endpointUpdate = "http://{}/seghm/update/seghm/{}".format(self.model.server,self.model.id_HM)
                                respTrazabilidad = requests.post(endpointUpdate, data=json.dumps(entTrazabilidad))
                                respTrazabilidad = respTrazabilidad.json()
                                print("respTrazabilidad del update: ",respTrazabilidad)

                                if "exception" in respTrazabilidad:
                                    sleep(0.5)
                                    respTrazabilidad = requests.post(endpointUpdate, data=json.dumps(entTrazabilidad))
                                    respTrazabilidad = respTrazabilidad.json()
                                    print("respTrazabilidad del update: ",respTrazabilidad)

                                    if "exception" in respTrazabilidad:
                                        sleep(0.5)
                                        respTrazabilidad = requests.post(endpointUpdate, data=json.dumps(entTrazabilidad))
                                        respTrazabilidad = respTrazabilidad.json()
                                        print("respTrazabilidad del update: ",respTrazabilidad)

                                        if "exception" in respTrazabilidad:

                                            print("no se logró hacer el update en trazabilidad")
                                            command = {
                                                        "lbl_result" : {"text": "No se logró hacer el update de Trazabilidad", "color": "red"},
                                                        "lbl_steps" : {"text": "Intenta Ingresar nuevamente arnés", "color": "black"}
                                                        }
                                            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                                            self.nok.emit()
                                            return
                                #### Trazabilidad FAMX2 Update de Información

                            else:                    

                                print("El Arnés se encuentra en otra ubicación de entrada")
                                command = {
                                "lbl_result" : {"text": "Ubicación de HM Incorrecta:", "color": "red"},
                                "lbl_steps" : {"text": famx2response["UBICACION"], "color": "black"}
                                }
                                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                                self.nok.emit()
                                return

                        #Si la columna que indica la hora de salida de TORQUE es None, significa que no ha completado esa estación y NO puede entrar aún a Inserción.
                        else:
                            print("El Arnés no ha pasado por la estación anterior (TORQUE) por lo que no puede entrar a Torque")
                            command = {
                            "lbl_result" : {"text": "Arnés sin Fecha de Historial de TORQUE", "color": "red"},
                            "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                            }
                            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                            self.nok.emit()
                            return
                except Exception as ex:
                    print("Conexión con FAMX2 exception: ", ex)
                    command = {
                            "lbl_result" : {"text": "Error de Conexión con Sistema de Trazabilidad", "color": "red", "font": "40pt"},
                            "lbl_steps" : {"text": "Verifique su conexión o deshabilite el Sistema de Trazabilidad con supervisión \nde personal de calidad", "color": "black", "font": "22pt"}
                            }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    self.nok.emit()
                    return
            ####

            endpoint = "http://{}/api/get/eventos".format(self.model.server)
            eventos = requests.get(endpoint).json()
            print("Lista eventos:\n",eventos)
            #print("Eventos: ",eventos["eventos"])
            #print("Eventos KEYS: ",eventos["eventos"].keys())
            for key in eventos["eventos"].keys():
                print("++++++++++++++Evento Actual++++++++++++++++:\n ",key)
                print("Valor Activo del Evento actual: ",eventos["eventos"][key][1][0])
                if eventos["eventos"][key][1][0] == 1:
                    endpoint = "http://{}/api/get/{}/modularidades/MODULARIDAD/=/{}/ACTIVO/=/1".format(self.model.server, key, self.model.codes["REF"])
                    response = requests.get(endpoint).json()
                    #print("Response: ",response)
                    if "MODULARIDAD" in response:
                        for i in response:
                            response[i] = response[i][0]
                        dbEvent = key
                        coincidencias += 1
                        print("En este Evento se encuentra la modularidad \n")
                        orden = response
            print("Coincidencias = ",coincidencias)
            if dbEvent != None:
                print("La Modularidad pertenece al Evento: ",dbEvent)
                if coincidencias != 1:
                    print("Datamatrix Redundante")
                    command = {
                        "lbl_result" : {"text": "Datamatrix redundante", "color": "red"},
                        "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                        }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    self.nok.emit()
                    return
                else:
                    print("Datamatrix Correcto")
            else:
                print("La Modularidad NO pertenece a ningún evento")
                command = {
                    "lbl_result" : {"text": "Datamatrix no registrado", "color": "green"},
                    "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                    }
                publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                self.nok.emit()
                return

            #endpoint = "http://{}/api/get/modularidades/MODULARIDAD/=/{}/ACTIVO/=/1".format(self.model.server, self.model.codes["REF"])
            #response = requests.get(endpoint).json()

            #if "MODULARIDAD" in response:
            #    if len(response["MODULARIDAD"]) == 1: 
            #        for i in response:
            #            response[i] = response[i][0]
            #        if response["ACTIVO"]:
            #            orden = response
            #        else:
            #            command = {
            #                        "lbl_result" : {"text": "Datamatrix desactivado", "color": "red"},
            #                        "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
            #                      }
            #            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            #            self.nok.emit()
            #            return
            #    else: 
            #        command = {
            #                    "lbl_result" : {"text": "Datamatrix redundante", "color": "red"},
            #                    "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
            #                  }
            #        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            #        self.nok.emit()
            #        return
            #else:
            #    command = {
            #            "lbl_result" : {"text": "Datamatrix no registrado", "color": "red"},
            #            "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
            #            }
            #    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            #    self.nok.emit()
            #    return

            endpoint = "http://{}/api/get/{}/pdcr/variantes".format(self.model.server, dbEvent)
            pdcrVariantes = requests.get(endpoint).json()
            print("Lista Final de Variantes PDC-R:\n",pdcrVariantes)

            endpoint = "http://{}/api/get/historial/HM/=/{}/RESULTADO/=/BUENO".format(self.model.server, self.model.codes["HM"])
            response = requests.get(endpoint).json()

            if ("items" in response and not(response["items"])) or self.model.local_data["qr_rework"]:
                flag_s = False
                flag_m = False
                flag_l = False
                modules = orden["MODULOS_FUSIBLES"].split(sep = ",")
                print(f"\n\t\tMODULOS_FUSIBLES:\n{modules}")
                for s in pdcrVariantes["small"]:
                    if s in modules:
                        #print("Tiene un modulo de caja SMALL")
                        flag_s = True
                for m in pdcrVariantes["medium"]:
                    if m in modules:
                        #print("Tiene un modulo de caja Medium")
                        flag_m = True
                for l in pdcrVariantes["large"]:
                    if l in modules:
                        #print("Tiene un modulo de caja LARGE")
                        flag_l = True
                print("\t\tFLAGS:\n Flag S - ",flag_s," Flag M - ",flag_m," Flag L - ",flag_l)
                if flag_l == True:
                    variante = "PDC-R"
                if flag_m == True and flag_l == False:
                    variante = "PDC-RMID"
                if flag_s == True and flag_m == False:
                    variante = "PDC-RS"
                if flag_s == False and flag_m == False and flag_l == False:
                    variante = "N/A"
                    print("La caja no contiene módulos pertenecientes a las categorías.")
                
                print("MODULO DETERMINANTE: ",variante)

                for i in modules:

                    endpoint = "http://{}/api/get/{}/modulos_fusibles/MODULO/=/{}/_/=/_".format(self.model.server, dbEvent, i)
                    response = requests.get(endpoint).json()
                    if "MODULO" in response:
                        if len(response["MODULO"]) == 1: 
                            for j in response:
                                if j == "ID" or j == "MODULO":
                                    response[j] = response[j][0]
                                else:
                                    response[j] = json.loads(response[j][0])
                                    if j in self.model.database["fuses"]:
                                        if not len(response[j]):
                                            continue
                                        for k in response[j]:
                                            if response[j][k] == "empty":
                                                pass
                                            elif k in self.model.database["fuses"][j]:
                                                ########### MODIFICACION PARA DEFINIR LA VARIANTE DE CAJA PDC-R ###########
                                                if "PDC-R" in j:
                                                    #print("AQUI HAY UNA PDC-R: ",j)
                                                    #print("SU VALOR: ",response[j])
                                                    if flag_l:
                                                        #print("ESTA CAJA SE DEBE CONVERTIR A PDC-R LARGE")
                                                        boxVariant = "PDC-R"
                                                    if flag_m == True and flag_l == False:
                                                        #print("ESTA CAJA SE DEBE CONVERTIR A PDC-R MEDIUM")
                                                        boxVariant = "PDC-RMID"
                                                    if flag_s == True and flag_m == False:
                                                        #print("ESTA CAJA SE DEBE CONVERTIR A PDC-R SMALL")
                                                        boxVariant = "PDC-RMID"#Por el momento se colocó así para que cuando llegue una caja small se tome como si fuera mid
                                                    if flag_s == False and flag_m == False and flag_l == False:
                                                        print("ESTA MODULARIDAD NO CONTIENE MÓDULOS QUE DETERMINEN SU VARIANTE")
                                                        command = {
                                                                "lbl_result" : {"text": "Sin módulos que determinen su variante en PDC-R"},
                                                                "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                                                              }
                                                        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                                                        self.nok.emit()
                                                        return
                                                    if not boxVariant in self.model.database["clamps"]:
                                                        self.model.database["clamps"].append(boxVariant)
                                                    if self.model.database["fuses"][boxVariant][k] == "empty":
                                                        self.model.database["fuses"][boxVariant][k] = response[j][k]
                                                    elif  self.model.database["fuses"][boxVariant][k] != response[j][k]:
                                                            command = {
                                                                "lbl_result" : {"text": f'DB Error con Módulo {response["MODULO"]}  en el fusible {boxVariant}: {k}", "color": "red'},
                                                                "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                                                              }
                                                            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                                                            self.nok.emit()
                                                            return
                                                else:
                                                    if not j in self.model.database["clamps"]:
                                                        self.model.database["clamps"].append(j)
                                                    if self.model.database["fuses"][j][k] == "empty":
                                                        self.model.database["fuses"][j][k] = response[j][k]
                                                    elif  self.model.database["fuses"][j][k] != response[j][k]:
                                                        command = {
                                                            "lbl_result" : {"text": f'DB Error con Módulo {response["MODULO"]}  en el fusible {j}: {k}", "color": "red'},
                                                            "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                                                          }
                                                        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                                                        self.nok.emit()
                                                        return
                        else:
                            print("response[MODULO]",response["MODULO"])
                            command = {
                                    "lbl_result" : {"text": f"Módulo {i} redundante en Matriz de evento", "color": "red"},
                                    "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                                  }
                            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                            self.nok.emit()
                            return
                    else:
                        command = {
                                "lbl_result" : {"text": f"Modulo {i} no encontrado", "color": "red"},
                                "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                                }
                        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                        self.nok.emit()
                        return 
                self.model.database["orden"] = orden
                self.model.datetime = datetime.now()

                self.model.QR = self.model.codes["HM"] + "-" + self.model.codes["REF"] + "-" + self.model.datetime.strftime("%d%m%Y%H%M%S") + "-" + self.model.no_serie
                print("\nQR: " + self.model.QR + "\n")
                print("\nAQUIIIII++++++: ",self.model.database["fuses"],"\n")

                #################### Distribucion de inserciones de acuerdo a cada robot de inserción ###########################
                temp = False
                for i in self.model.database["fuses"]:
                    for j in self.model.database["fuses"][i]:
                        if self.model.database["fuses"][i][j] != "empty":


                            if i == "PDC-RMID" and not(self.model.pdcr_mid):
                                self.model.database["fuses"]["PDC-R"] = {}
                                self.model.pdcr_mid = True
                            if i == "PDC-R" and not (temp):
                                self.model.database["fuses"]["PDC-RMID"] = {}
                                temp = True

                            ##################### SE ASIGNAN LAS TAREAS PARA EL ROBOTA y ROBOTB, EN LADO IZQ Y DER ####################

                            if i == "PDC-D" or i == "PDC-P":
                                #print("**** Robot A ****")
                                #print("Fusible: ",self.model.database["fuses"][i][j])
                                if self.model.database["fuses"][i][j] in self.model.AfusesIzq:
                                    #print("Fusible Robot A IZQUIERDA")
                                    self.model.robots["robot_a"]["queueIzq"].append([i, j, self.model.database["fuses"][i][j]])
                                if self.model.database["fuses"][i][j] in self.model.AfusesDer:
                                    #print("Fusible Robot A DERECHA")
                                    self.model.robots["robot_a"]["queueDer"].append([i, j, self.model.database["fuses"][i][j]])
                                

                            if i == "PDC-R" or i == "PDC-RMID" or i == "PDC-S" or i == "TBLU":
                                #print("**** Robot B ****")
                                #print("Fusible: ",self.model.database["fuses"][i][j])
                                if self.model.database["fuses"][i][j] in self.model.BfusesIzq:
                                    #print("Fusible Robot B IZQUIERDA")
                                    self.model.robots["robot_b"]["queueIzq"].append([i, j, self.model.database["fuses"][i][j]])
                                if self.model.database["fuses"][i][j] in self.model.BfusesDer:
                                    #print("Fusible Robot B DERECHA")
                                    self.model.robots["robot_b"]["queueDer"].append([i, j, self.model.database["fuses"][i][j]])
                #################################################################################################################         

                if self.model.local_data["qr_rework"]:
                    self.model.local_data["qr_rework"] = False
                print("dbEvent: ",dbEvent)
                event = dbEvent.upper()
                evento = event.replace('_',' ')

                if self.model.config_data["modo_manual"] == True:
                    command = {
                        "lbl_result" : {"text": "Datamatrix OK", "color": "green"},
                        "lbl_steps" : {"text": "MODO INSERCIÓN MANUAL", "color": "black"},
                        "statusBar" : orden["MODULARIDAD"]+" "+self.model.codes["HM"]+" "+evento,
                        #"img_center" : f"boxes/{batt}.jpg"  #Aqui actualizar la imagen principal con un colage de las cajas que faltan por clampear
                        }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    self.ok_MANUAL.emit()

                else:
                    command = {
                        "lbl_result" : {"text": "Datamatrix OK", "color": "green"},
                        "lbl_steps" : {"text": "Coloca el resto de las cajas", "color": "black"},
                        "statusBar" : orden["MODULARIDAD"]+" "+self.model.codes["HM"]+" "+evento,
                        #"img_center" : f"boxes/{batt}.jpg"  #Aqui actualizar la imagen principal con un colage de las cajas que faltan por clampear
                        }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                    Timer(0.1, self.fuseBoxesClamps).start()

                    #################################
                    print("self.model.robots_mode EN CHECK_QR: ",self.model.robots_mode)
                    if self.model.robots_mode == 1:
                        #"MODO UN ROBOT ACTIVADO"
                        command = {"lbl_nuts" : {"text": "MODO: UN ROBOT", "color": "purple"}}
                        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                        self.ok_F4.emit()

                    elif self.model.robots_mode == 2:
                        #"MODO DOS ROBOTS ACTIVADOS"
                        command = {"lbl_nuts" : {"text": "MODO: DOS ROBOTS", "color": "purple"}}
                        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                        self.ok_CTRL.emit()
                    else:
                        self.nok.emit()
                    ################################

            else:
                self.rework.emit()
                return

        except Exception as ex:
            print("Datamatrix request exception: ", ex) 
            temp = f"Database Exception: {ex.args}"
            command = {
                        "lbl_result" : {"text": temp, "color": "red"},
                        "lbl_steps" : {"text": "Inténtalo de nuevo", "color": "black"}
                        }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.model.fusesInit()
            self.nok.emit()

    def fuseBoxesClamps(self):
        command = {}
        for i in self.model.database["fuses"]:
            if i in self.model.database["clamps"]:
                command[i] = True
            else:
                command[i] = False
        publish.single(self.model.pub_topics["plc"],json.dumps(command),hostname='127.0.0.1', qos = 2)

class QrRework (QState):
    ok = pyqtSignal()
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

        self.model.transitions.key.connect(self.rework)
        self.model.transitions.code.connect(self.noRework)

    def onEntry(self, QEvent):
        command = {
            "lbl_result" : {"text": "Datamatrix procesado anteriormente", "color": "red"},
            "lbl_steps" : {"text": "Escanea otro código o gira la llave para continuar", "color": "black"},
            "show":{"scanner": True}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

    def onExit(self, QEvent):
        command = {
            "show":{"scanner": False}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

    def rework (self):
        self.model.local_data["qr_rework"] = True
        Timer(0.05, self.ok.emit).start()

    def noRework(self):
        Timer(0.05, self.ok.emit).start()

class ClampsMonitor(QState):
    ok = pyqtSignal()

    def __init__(self, module = "clamps_a", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):

        temp = False
        #self.model.database["clamps"] contiene los clamps necesarios para el arnés escaneado
        #self.model.plc["clamps"] contiene las cajas que se han clampeado correctamente en físico
        print("\n database: ", self.model.database["clamps"])
        print(" PLC     : ", self.model.plc["clamps"],"\n")
        
        database_temp = []

        command = {
                    "lbl_result" : {"text": "Esperando cajas para continuar", "color": "green"},
                    "lbl_steps" : {"text": "Coloca el resto de las cajas", "color": "black"},
                    "img_center" : "logo.jpg"
                    }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        if self.module == "clamps_a":
            if not("PDC-D" in database_temp):
                if "PDC-D" in self.model.database["clamps"]:
                     database_temp.append("PDC-D")
            if not("PDC-P" in database_temp):
                if "PDC-P" in self.model.database["clamps"]:
                    database_temp.append("PDC-P")

        if self.module == "clamps_b":
            if not("PDC-R" in  database_temp):
                if "PDC-R" in self.model.database["clamps"]:
                     database_temp.append("PDC-R")
            if not("PDC-RMID" in  database_temp):
                if "PDC-RMID" in self.model.database["clamps"]:
                     database_temp.append("PDC-RMID")
            if not("PDC-S" in  database_temp):
                if "PDC-S" in self.model.database["clamps"]:
                     database_temp.append("PDC-S")
            if not("TBLU" in  database_temp):
                if "TBLU" in self.model.database["clamps"]:
                     database_temp.append("TBLU")

        print("\n database_temp: ", database_temp)
        self.model.databaseTempModel = database_temp

        for i in database_temp:
            if not(i in self.model.plc["clamps"]):
                temp = False
                break
            else:
                temp = True

        #si se colocaron las cajas necesarias de un robot se emite el ok correspondiente
        if temp:

            if self.module == "clamps_a":
                tagrob = "Robot A"
            if self.module == "clamps_b":
                tagrob = "Robot B"

            command = {
                "lbl_result" : {"text": f"Cajas de {tagrob} colocadas", "color": "green"},
                "lbl_steps" : {"text": f"Presionar boton verde o CTRL para comenzar", "color": "black"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.ok.emit()

class ClampsMonitorBoth(QState):
    ok = pyqtSignal()

    def __init__(self, module = "clamps", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):

        temp = False
        #self.model.database["clamps"] contiene los clamps necesarios para el arnés escaneado
        #self.model.plc["clamps"] contiene las cajas que se han clampeado correctamente en físico
        print("\n database: ", self.model.database["clamps"])
        print(" PLC     : ", self.model.plc["clamps"],"\n")
        
        database_temp = []

        command = {
                    "lbl_result" : {"text": "Esperando cajas para continuar", "color": "green"},
                    "lbl_steps" : {"text": "Coloca el resto de las cajas", "color": "black"},
                    "img_center" : "logo.jpg"
                    }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        if not("PDC-D" in database_temp):
            if "PDC-D" in self.model.database["clamps"]:
                    database_temp.append("PDC-D")
        if not("PDC-P" in database_temp):
            if "PDC-P" in self.model.database["clamps"]:
                database_temp.append("PDC-P")
        if not("PDC-R" in  database_temp):
            if "PDC-R" in self.model.database["clamps"]:
                    database_temp.append("PDC-R")
        if not("PDC-RMID" in  database_temp):
            if "PDC-RMID" in self.model.database["clamps"]:
                    database_temp.append("PDC-RMID")
        if not("PDC-S" in  database_temp):
            if "PDC-S" in self.model.database["clamps"]:
                    database_temp.append("PDC-S")
        if not("TBLU" in  database_temp):
            if "TBLU" in self.model.database["clamps"]:
                    database_temp.append("TBLU")

        print("\n database_temp: ", database_temp)
        self.model.databaseTempModel = database_temp

        for i in database_temp:
            if not(i in self.model.plc["clamps"]):
                temp = False
                break
            else:
                temp = True

        #si ya se colocaron todos los clamps que lleva el arnés
        if temp:

            command = {
                "lbl_result" : {"text": f"Todas las cajas colocadas", "color": "green"},
                "lbl_steps" : {"text": f"Presionar boton verde o CTRL para comenzar", "color": "black"}
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.ok.emit()

class Clamps_Standby(QState):

    def __init__(self, module = "clamps", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):

        print("Esperando START")

class Finish (QState):
    ok      = pyqtSignal()
    nok     = pyqtSignal()

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, event):

        ##################### EXCEL DE TIEMPOS #########################
        #Aquí se crea el Excel con los tiempos recopilados por los Robots
        #print("Creando excel de TIEMPOS....")
        #print("Valor Final de Tiempos: ",self.model.insertion_times)

        #wb = Workbook()
        #filestamp = strftime('%Y%m%d-%H%M%S') #Fecha y Hora actual
        #print("FILESTAMP (HORA ACTUAL): ",filestamp)
        #print("Tipo de dato de FILESTAMP: ",type(filestamp))
        #filesheet = "./"+self.model.codes["HM"]+"-"+filestamp+".xlsx" #Se crea el archivo con el nombre del HM + Fecha y Hora actual
        #sheet = wb.active
        #sheet.title = "Inserción"
        ##Se crean los encabezados
        #sheet.append(["CAVIDAD","TIEMPO_ENVIO_MENSAJE","TIEMPO_MENSAJE","TIEMPO_RESET","TIEMPO_REINICIO","TIEMPO_TOTAL","TIEMPO_ESPERA_ROBOTA","TIEMPO_ESPERA_ROBOTB","TIEMPO_TRASLADO_TOMA","TIEMPO_PRESENCIA_TOMA","TIEMPO_BAJADA_TOMA","TIEMPO_VACIO_TOMA","TIEMPO_SUBIDA_TOMA","TIEMPO_TRASLADO_INSERCION","TIEMPO_BAJADA_INSERCION","TIEMPO_CILINDRO_INSERCION","TIEMPO_INSERCION_INSERCION","TIEMPO_SUBIDA_INSERCION"])
        ##sheet["A1"] = "Cavidad"
        ##sheet["B1"] = "Tiempos"
        ##print("Data.items(): ",data.items())
        #encabezados = {}
        #print("+++++++++++Recorriendo Excel ya creado:\n")
        ##Se recorren los encabezados en el excel para identificar la columna (Ej. "A","J",etc) de cada uno y guardarlo en un arreglo (encabezados)
        #for column in range(1, sheet.max_column + 1):
        #    print("column: ",column)
        #    char = get_column_letter(column)
        #    print("Letra o Columna en Excel: ",char)
        #    header = sheet.cell(row = 1, column = column).value
        #    print("Header: ",header)
        #    encabezados[header] = char
        #print("Encabezados Arreglo: ",encabezados)
        #print("||||||self.model.insertion_times.items(): ",self.model.insertion_times.items())
        ##Se agregan al Excel las cavidades y valores correspondientes
        #for row, (key,value) in enumerate(self.model.insertion_times.items(),start=2):
        #    #print("Row dentro del for: ",row)
        #    #print("Tipo de dato del ROW: ",type(row))
        #    #print("Key dentro del for: ",key)
        #    #print("Tipo de dato KEY: ",type(key))
        #    #print("Value dentro del for: ",value)
        #    #print("Tipo de dato VALUE: ",type(value))
        #    #print("IMPRIMIENDO VALORES DENTRO DEL FOR:\n")
        #    sheet[f"A{row}"] = key
        #    for i in value:
        #        print("----i: ",i)
        #        print("value[i]",value[i])
        #        print("Columna donde se colocará: ",encabezados[i])
        #        sheet[encabezados[i]+str(row)] = str(value[i])
        #    #y = json.dumps(value)
        #    #print("VALUE CONVERTIDO (y): ",y)
        #    #print("Tipo de dato y: ",type(y))

        #wb.save(filesheet)
        #print("Excel Guardado Correctamente")

        #self.model.insertion_times = {}
        ###########################################################

        print("current state: Finish (cycle_manage)")
        #se reinicia el modo de los robots para escoger en el siguiente arnés
        self.model.robots_mode = 0
        self.model.thread_robot = False
        self.model.init_thread_robot = False
        self.model.robot_principal = False
        self.model.acomodo_listas = True
        self.model.acomodo_listas_2 = True

        command = {}
        for i in self.model.database["fuses"]:
                command[i] = False
        publish.single(self.model.pub_topics["plc"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        historial = {
            "HM":           self.model.codes["HM"],
            "QR_FET":       self.model.codes["FET"],
            "QR_MAQUINA":   self.model.QR,
            "RESULTADO":    "BUENO",
            "FUSIBLES":     self.model.database["fuses"],
            "REINTENTOS":   self.model.retries,
            "INICIO":       self.model.datetime.isoformat(),
            "FIN":          datetime.now().strftime("%Y/%m/%d %H:%M:%S"),
            "USUARIO":      self.model.local_data["user"]["type"] + ": " + self.model.local_data["user"]["name"] + "."
            }
        resp = requests.post(f"http://{self.model.server}/api/post/historial",data=json.dumps(historial))
        resp = resp.json()

        #### Trazabilidad FAMX2 Update de Información
        if self.model.config_data["trazabilidad"]:
            try:
                print("||Realizando el Update de SALIDA a Trazabilidad en FAMX2")
                print("ID a la que se realizará el Update para Trazabilidad",self.model.id_HM)
                salTrazabilidad = {
                    "SALINSERCION": historial["FIN"],
                    "UBICACION": "SALIDA_DE_INSERCION",
                    "NAMEINSERCION": self.model.no_serie
                    }
                endpointUpdate = "http://{}/seghm/update/seghm/{}".format(self.model.server,self.model.id_HM)
                respTrazabilidad = requests.post(endpointUpdate, data=json.dumps(salTrazabilidad))
                respTrazabilidad = respTrazabilidad.json()
                print("respTrazabilidad del update: ",respTrazabilidad)

                if "exception" in respTrazabilidad:
                    sleep(0.5)
                    respTrazabilidad = requests.post(endpointUpdate, data=json.dumps(salTrazabilidad))
                    respTrazabilidad = respTrazabilidad.json()
                    print("respTrazabilidad del update: ",respTrazabilidad)

                    if "exception" in respTrazabilidad:
                        sleep(0.5)
                        respTrazabilidad = requests.post(endpointUpdate, data=json.dumps(salTrazabilidad))
                        respTrazabilidad = respTrazabilidad.json()
                        print("respTrazabilidad del update: ",respTrazabilidad)

                        if "exception" in respTrazabilidad:

                            print("no se logró hacer el update en trazabilidad")
                            command = {
                                        "lbl_result" : {"text": "Problema de red: Actualización de Trazabilidad", "color": "red"},
                                        "lbl_steps" : {"text": 'Para volver a intentar botón Amarillo, para continuar "CTRL"', "color": "black"}
                                        }
                            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
                            self.model.problema_trazabilidad = True
                            print("self.model.problema_trazabilidad = True, Esperando señal de botón amarillo o tecla CTRL para reintar publish o continuar")
                            self.nok.emit()
                            return

            except Exception as ex:
                print("Excepción al momento de guardar datos en FAMX2", ex)
        #### Trazabilidad FAMX2 Update de Información


        if "HM000000011936" in self.model.codes["HM"]:
            self.model.config_data["trazabilidad"] = True
                        
        if "HM000000011925" in self.model.codes["HM"]:
            self.model.config_data["trazabilidad"] = True

        if "HM000000011920" in self.model.codes["HM"]:
            self.model.config_data["trazabilidad"] = True

        if self.model.config_data["trazabilidad"] == True:
            command = {
                "lbl_info3" : {"text": "Trazabilidad\nActivada", "color": "green"}
            }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)


        Timer(0.1, self.finalMessage).start()
        self.model.robothome_a = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
        self.model.robothome_b = True # variable para activar Mensaje de enviar robot a home, se resetea sola en comm.py
        Timer(2,self.ok.emit).start()

    def finalMessage(self):
        command = {
            "lbl_result" : {"text": "Ciclo terminado", "color": "green"},
            "lbl_steps" : {"text": "Retira las cajas", "color": "black"},
            "lbl_nuts" : {"text": "", "color": "purple"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

class Reset (QState):
    ok      = pyqtSignal()
    nok     = pyqtSignal()
    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, event):

        if "HM000000011936" in self.model.codes["HM"]:
            self.model.config_data["trazabilidad"] = True
                        
        if "HM000000011925" in self.model.codes["HM"]:
            self.model.config_data["trazabilidad"] = True

        if "HM000000011920" in self.model.codes["HM"]:
            self.model.config_data["trazabilidad"] = True


        if self.model.config_data["trazabilidad"] == True:
            command = {
                "lbl_info3" : {"text": "Trazabilidad\nActivada", "color": "green"}
            }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        #se reinicia el modo de los robots para escoger en el siguiente arnés
        self.model.robots_mode = 0
        self.model.thread_robot = False
        self.model.init_thread_robot = False
        self.model.robot_principal = False
        self.model.acomodo_listas = True
        self.model.acomodo_listas_2 = True

        command = {
            "lbl_result" : {"text": "Se giró la llave de reset", "color": "green"},
            "lbl_steps" : {"text": "Reiniciando", "color": "black"},
            "lbl_nuts" : {"text": "", "color": "purple"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        command = {}
        for i in self.model.database["fuses"]:
                command[i] = False
        publish.single(self.model.pub_topics["plc"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        if self.model.datetime != None:
            historial = {
                "HM":           self.model.codes["HM"],
                "QR_FET":       self.model.codes["FET"],
                "QR_MAQUINA":   self.model.QR,
                "RESULTADO":    "MALO",
                "FUSIBLES":     self.model.database["fuses"],
                "REINTENTOS":   self.model.retries,
                "INICIO":       self.model.datetime.isoformat(),
                "FIN":          datetime.now().isoformat(),
                "USUARIO":      self.model.local_data["user"]["type"] + ": " + self.model.local_data["user"]["name"] + "."
                }
            resp = requests.post(f"http://{self.model.server}/api/post/historial",data=json.dumps(historial))
            resp = resp.json()
            if "items" in resp:
                if resp["items"] == 1:
                    pass
                else:
                    command = {
                        "lbl_result" : {"text": "Error de conexión", "color": "red"},
                        "lbl_steps" : {"text": "Datos no guardados", "color": "black"}
                        }
                    publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
        Timer(2,self.ok.emit).start()

class Waiting_Robot (QState):
    ok      = pyqtSignal()
    waiting = pyqtSignal()

    def __init__(self, model = None, parent = None):
        super().__init__(parent)
        self.model = model

    def onEntry(self, event):

        command = {
            "lbl_info3" : {"text": "Esperando\n Segundo\n Robot", "color": "green"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        print("Esperando segundo robot...")
        #para saber cuando el robot principal termina antes que el thread
        self.model.robot_principal = True

        #variable para saber que el robot thread ya termino
        if self.model.thread_robot == True:
            self.model.robot_principal = False
            self.ok.emit()
        elif self.model.thread_robot == False:
            Timer(2,self.waiting.emit).start()

    def onExit(self, event):
        #se limpia el mensaje de lbl_info3
        command = {
            "lbl_info3" : {"text": "", "color": "green"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)