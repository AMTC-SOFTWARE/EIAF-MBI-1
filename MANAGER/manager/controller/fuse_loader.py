from PyQt5.QtCore import QState, pyqtSignal
from cv2 import imwrite
from paho.mqtt import publish
from threading import Timer
from shutil import copyfile
from time import strftime
from copy import copy
from math import ceil
import json

class Test(QState):
    ok  = pyqtSignal()
    nok = pyqtSignal()

    def __init__(self, module = "loader_1", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

        self.get_fuse       = GetFuse(module = self.module, model = self.model, parent = self)
        self.color_sensor   = ColorSensor(module = self.module, model = self.model, parent = self)
        self.fin_test       = FinTest(module = self.module, model = self.model, parent = self)
        self.standby        = QState(self)
        self.standby_2      = QState(self)


        self.get_fuse.addTransition(self.model.transitions.color, self.color_sensor)
        self.color_sensor.addTransition(self.model.transitions.pose, self.fin_test)
        self.fin_test.addTransition(self.fin_test.nok, self.standby)
        self.standby.addTransition(self.model.transitions.pose, self.fin_test)
        self.fin_test.addTransition(self.fin_test.ok, self.standby_2)

        self.setInitialState(self.get_fuse) 


class FinTest(QState):
    ok  = pyqtSignal()
    nok = pyqtSignal()

    def __init__(self, module = "loader_1", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):
        if "PDC-R_F400" in self.model.loaders["loader_1"]["pose"]:
            command = {}
            for i in self.model.database["fuses"]:
                    command[i] = False
            publish.single(self.model.pub_topics["plc"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            command = {
                "lbl_result" : {"text": "Inserción OK", "color": "green"},
                "lbl_steps" : {"text": "Gira la llave para terminar", "color": "black"},
                }
            publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)
            self.ok.emit()
        else:
            self.nok.emit()


class ColorSensor(QState):
    ok  = pyqtSignal()
    nok = pyqtSignal()

    def __init__(self, module = "loader_1", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):
        Timer(1, self.response).start()

    def response(self):
        command = {
            "trigger": "color_ok"
            }
        publish.single(self.model.pub_topics["robot"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        command = {
            "lbl_result" : {"text": "Respuesta de color enviada", "color": "green"},
            "lbl_steps" : {"text": "Esperando inserción en PDC-R F400", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)


class GetFuse(QState):
    ok  = pyqtSignal()
    nok = pyqtSignal()

    def __init__(self, module = "loader_1", model = None, parent = None):
        super().__init__(parent)
        self.model = model
        self.module = module

    def onEntry(self, QEvent):
        Timer(1, self.moveRobot).start()

    def moveRobot(self):
        command = {
            "trigger": "ATO_15_PDC-R_F400"
            }
        publish.single(self.model.pub_topics["robot"],json.dumps(command),hostname='127.0.0.1', qos = 2)

        command = {
            "lbl_result" : {"text": "Trigger_robot lanzado", "color": "green"},
            "lbl_steps" : {"text": "Esperando petición de color", "color": "black"}
            }
        publish.single(self.model.pub_topics["gui"],json.dumps(command),hostname='127.0.0.1', qos = 2)



#class GetFuse(QState):
#    ok  = pyqtSignal()
#    nok = pyqtSignal()

#    def __init__(self, module = "loader_1", model = None, parent = None):
#        super().__init__(parent)
#        self.model = model
#        self.module = module

#    def onEntry(self, QEvent):
#        pass


#class ColorSensor (QState):
#    ok  = pyqtSignal()
#    nok = pyqtSignal()

#    def __init__(self, module = "loader_1", model = None, parent = None):
#        super().__init__(parent)
#        self.model = model
#        self.module = module

#    def onEntry(self, QEvent):
