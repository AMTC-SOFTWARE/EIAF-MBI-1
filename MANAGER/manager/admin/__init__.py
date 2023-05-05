from PyQt5.QtWidgets import QDialog, QMessageBox
from PyQt5.QtCore import pyqtSignal, QTimer, QObject, Qt
from paho.mqtt.client import Client
from pickle import load, dump
from os.path import exists
from cv2 import imwrite
from os import system
import json

from admin import admin
from gui import PopOut

class Admin (QDialog):
    rcv     = pyqtSignal(dict)

    def __init__(self, data):
        self.data = data
        super().__init__(data.mainWindow)
        self.ui = admin.Ui_admin()
        self.ui.setupUi(self)
        self.user_type = self.data.local_data["user"]["type"]
        self.client = Client()
        self.config = {}
        self.kiosk_mode = True
        self.pop_out = PopOut(self)
        self.torques = False

        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        QTimer.singleShot(100, self.startClient)

        if self.data.config_data["trazabilidad"] == True:
            self.ui.checkBox_2.setChecked(True)
        else:
            self.ui.checkBox_2.setChecked(False)

        if self.data.config_data["modo_manual"] == True:
            self.ui.checkBox_3.setChecked(True)
        else:
            self.ui.checkBox_3.setChecked(False)


        self.ui.btn_reset.clicked.connect(self.resetMachine)
        self.ui.btn_off.clicked.connect(self.poweroff)

        self.ui.checkBox_1.stateChanged.connect(self.onClicked_1)
        self.ui.checkBox_2.stateChanged.connect(self.onClicked_2)
        self.ui.checkBox_3.stateChanged.connect(self.onClicked_3)

        #self.data.transitions.torque_bw.connect(self.torqueUpdate)

        
        self.permissions()

####################### Show widget with corresponding permissions ########################

    def permissions (self):
        if self.user_type == "AMTC":
            self.ui.btn_off.setEnabled(True)
            self.ui.btn_reset.setEnabled(True)
            self.ui.checkBox_1.setEnabled(True)
            self.ui.checkBox_2.setEnabled(True)
            self.ui.checkBox_3.setEnabled(True)
        elif self.user_type == "CALIDAD":
            self.ui.btn_off.setEnabled(False)
            self.ui.btn_reset.setEnabled(False)
            self.ui.checkBox_1.setEnabled(True)
            self.ui.checkBox_2.setEnabled(False)
            self.ui.checkBox_3.setEnabled(True)
        elif self.user_type == "MANTENIMIENTO":
            self.ui.btn_off.setEnabled(True)
            self.ui.btn_reset.setEnabled(True)
            self.ui.checkBox_1.setEnabled(True)
            self.ui.checkBox_2.setEnabled(False)
            self.ui.checkBox_3.setEnabled(False)
        elif self.user_type == "PRODUCCION":
            self.ui.btn_off.setEnabled(False)
            self.ui.btn_reset.setEnabled(False)
            self.ui.checkBox_1.setEnabled(False)
            self.ui.checkBox_2.setEnabled(False)
            self.ui.checkBox_3.setEnabled(False)
        elif self.user_type == "OPERADOR":
            self.ui.btn_off.setEnabled(False)
            self.ui.btn_reset.setEnabled(False)
            self.ui.checkBox_1.setEnabled(False)
            self.ui.checkBox_2.setEnabled(False)
            self.ui.checkBox_3.setEnabled(False)
        self.show()

###################################### MQTT Client ########################################

    def startClient(self):
        try:
            self.client.connect(host = "127.0.0.1", port = 1883, keepalive = 60)
            self.client.loop_start()
        except Exception as ex:
            print("Admin MQTT client connection fail. Exception:\n", ex.args)

    def stopClient (self):
        self.client.loop_stop()
        self.client.disconnect()
        
    def resetClient (self):
        self.stop()
        self.start()

    def on_connect(self, client, userdata, flags, rc):
        client.subscribe("#")
        print("Admin MQTT client connected with code [{}]".format(rc))

    def on_message(self, client, userdata, message):
        try:
            dic = {
                "topic": message.topic,
                "payload": json.loads(message.payload)
                }
            self.rcv.emit(dic)
        except Exception as ex:
            print("Admin MQTT client on_message() Exception:\n", ex.args)
   
###################################### Buttons Actions #####################################
    def resetMachine(self):
        choice = QMessageBox.question(self, 'Reiniciar', "Estas seguro de reiniciar la estación?",QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
        if choice == QMessageBox.Yes:
            system("shutdown /r")
            self.client.publish("config/status", '{"shutdown": true}')
            self.close()
        else:
            pass

    def poweroff(self):
        choice = QMessageBox.question(self, 'Apagar', "Estas seguro de apagar la estación?",QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
        if choice == QMessageBox.Yes:
            system("shutdown /s")
            self.client.publish("config/status", '{"shutdown": true}')
            self.close()
        else:
            pass

###################################### Checkbox Actions #####################################

    def onClicked_1(self):
        if self.ui.checkBox_1.isChecked() and self.kiosk_mode:
            system("start explorer.exe")
            self.kiosk_mode = False

    def onClicked_2(self):
        if self.ui.checkBox_2.isChecked():
            self.data.config_data["trazabilidad"] = True
            print("Sistema de Trazabilidad Habilitado")
            self.pop_out.setText("El Sistema de Trazabilidad ha sido Habilitado")
            self.pop_out.setWindowTitle("Acción Realizada")
            QTimer.singleShot(3000, self.pop_out.button(QMessageBox.Ok).click)
            self.pop_out.exec()
        else:
            self.data.config_data["trazabilidad"] = False
            print("Sistema de Trazabilidad Deshabilitado")
            self.pop_out.setText("El Sistema de Trazabilidad ha sido Deshabilitado")
            self.pop_out.setWindowTitle("Acción Realizada")
            QTimer.singleShot(3000, self.pop_out.button(QMessageBox.Ok).click)
            self.pop_out.exec()


    def onClicked_3(self):
        if self.ui.checkBox_3.isChecked():
            self.data.config_data["modo_manual"] = True
            print("Modo Inserción Manual Habilitado")
            self.pop_out.setText("Modo Inserción Manual ha sido Habilitado")
            self.pop_out.setWindowTitle("Acción Realizada")
            QTimer.singleShot(2000, self.pop_out.button(QMessageBox.Ok).click)
            self.pop_out.exec()
        else:
            self.data.config_data["modo_manual"] = False
            print("Modo Inserción Manual Deshabilitado")
            self.pop_out.setText("Modo Inserción Manual ha sido Deshabilitado")
            self.pop_out.setWindowTitle("Acción Realizada")
            QTimer.singleShot(2000, self.pop_out.button(QMessageBox.Ok).click)
            self.pop_out.exec()

###################################### Events Functions ##################################
    def torqueUpdate(self):
        if self.torques:
            for i in self.data.torques:
                if self.data.config_data["backward"]:
                    self.client.publish(self.data.pub_topics["plc"], json.dumps({i: True}))
                else:
                    if self.data.torques[i]["torque_bw"]:
                        self.client.publish(self.data.pub_topics["plc"], json.dumps({i: False}))
                    else:
                        self.client.publish(self.data.pub_topics["plc"], json.dumps({i: True}))

###################################### Close Actions #####################################

    def closeEvent(self, event):
        self.client.publish("config/status", '{"finish": true}')
        with open("data\config", "wb") as f:
            dump(self.config, f, protocol=3)
        #system("taskkill /f /im explorer.exe")
        self.stopClient()
        event.accept()
        self.deleteLater()

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Escape:
            print("Escape key was pressed")


