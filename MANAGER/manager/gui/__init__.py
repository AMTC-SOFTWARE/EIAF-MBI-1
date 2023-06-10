# -*- coding: utf-8 -*-
"""

@authors: MSc. Marco Rutiaga Quezada
          MSc. Aarón Castillo Tobías
          
"""
from PyQt5 import QtWidgets
from PyQt5.QtWidgets import QDialog, QMainWindow, QLineEdit, QMessageBox, QAction
from PyQt5.QtCore import pyqtSignal, pyqtSlot, Qt, QTimer, QSize
from PyQt5.QtGui import QPixmap
from threading import Timer
from os.path import exists
from os import system 
import ctypes #PARA OBTENER RESOLUCION DE LA PANTALLA
import json 

from gui import main, login, scanner, img_popout
from gui.comm import MqttClient
from gui.model import Model

class MainWindow (QMainWindow):

    output = pyqtSignal(dict)
    ready  = pyqtSignal()
    closed = pyqtSignal()

    def __init__(self, name = "GUI", topic = "gui", menuMode = True, parent = None):
        super().__init__(parent)

        self.model = Model()
        self.ui = main.Ui_main()
        self.qw_login = Login(parent = self)
        self.qw_scanner = Scanner(parent = self)
        self.qw_img_popout = Img_popout(parent = self)
        self.pop_out = PopOut(self)
        self.pop_out_manual = PopOutManual(self)

        self.model.name = name
        self.setTopic = topic + "/set"
        self.statusTopic = topic + "/status"

        self.ui.setupUi(self)
        self.ui.lbl_result.setText("") 
        self.ui.lbl_steps.setText("")
        self.ui.lbl_nuts.setText("")
        #############################
        self.ui.lbl_box1.setText("")
        self.ui.lbl_box2.setText("")
        self.ui.lbl_box3.setText("")
        self.ui.lbl_box4.setText("")
        self.ui.lbl_box5.setText("")
        self.ui.lbl_box6.setText("")
        self.ui.lbl_box7.setText("") ######### Modificación para F96 #########
        #############################
        self.ui.lbl_user.setText("")
        self.ui.lbl_info1.setText("")
        self.ui.lbl_info2.setText("")
        self.ui.lbl_info3.setText("")
        self.ui.lbl_info4.setText("") #se inicializa la etiqueta que no se usa en vacío
        self.setWindowTitle(self.model.name)

        menu = self.ui.menuMenu
        actionLogin = QAction("Login",self)
        actionLogout = QAction("Logout",self)
        actionConfig = QAction("Config",self)
        actionWEB = QAction("WEB",self)
        menu.addAction(actionLogin)
        menu.addAction(actionLogout)
        menu.addAction(actionConfig)
        menu.addAction(actionWEB)
        menu.triggered[QAction].connect(self.menuProcess)
        menu.setEnabled(menuMode)

        self.qw_login.ui.lineEdit.returnPressed.connect( self.login)
        self.qw_login.ui.btn_ok.clicked.connect(self.login)
        self.qw_scanner.ui.btn_ok.clicked.connect(self.scanner)
        self.qw_scanner.ui.lineEdit.returnPressed.connect(self.scanner)
        self.qw_scanner.ui.btn_cancel.clicked.connect(self.qw_scanner.ui.lineEdit.clear)
        
        self.timer = QTimer(self)
        #self.timer.timeout.connect(self.status)
        #self.timer.start(200)

        self.allow_close        = True
        self.cycle_started      = False
        self.shutdown           = False

        self.client = MqttClient(self.model, self)
        self.client.subscribe.connect(self.input)
        self.output.connect(self.client.publish)
        self.client.connected.connect(self.ready.emit)
        self.client.setup()

    def menuProcess(self, q):
        try:
            case = q.text()               
            if case == "Login":
                self.qw_login.ui.lineEdit.setText("")
                self.qw_login.ui.lineEdit.setPlaceholderText("Escanea o escribe tu codigo")
                self.output.emit({"request":"login"})
            elif case == "Logout":
                if self.cycle_started == False:
                    self.qw_login.ui.lineEdit.setText("")
                    self.qw_login.ui.lineEdit.setPlaceholderText("Escanea o escribe tu codigo")
                    self.output.emit({"request":"logout"})
                else:
                    self.pop_out.setText("Ciclo en proceso no se permite el logout")
                    self.pop_out.setWindowTitle("Warning")
                    QTimer.singleShot(2000, self.pop_out.button(QMessageBox.Ok).click)
                    self.pop_out.exec()
            elif case == "Config":
                #print("GUI: Config is disabled")
                #return
                if self.cycle_started == False:
                    self.output.emit({"request":"config"})
                else:
                    self.pop_out.setText("Ciclo en proceso no se permite la configuración, gire la llave para acceder a Config")
                    self.pop_out.setWindowTitle("Warning")
                    QTimer.singleShot(3000, self.pop_out.button(QMessageBox.Ok).click)
                    self.pop_out.exec()
            elif case == "WEB":
                if exists("C:\BIN\WEB.url"):
                    Timer(0.05, self.launchWEB).start()
                else:   
                    self.pop_out.setText("No se encontró la página WEB")
                    self.pop_out.setWindowTitle("Error")
                    QTimer.singleShot(2000, self.pop_out.button(QMessageBox.Ok).click)
                    self.pop_out.exec()
        except Exception as ex:
            print("menuProcess() exceptión: ", ex)

    def launchWEB(self):
        try:
            self.output.emit({"WEB": "open"})
            system("C:\BIN\WEB.url")
        except Exception as ex:
            print("launchWEB() exception: ", ex)

    @pyqtSlot()
    def status (self):
        try:
            if self.isVisible() != self.model.status["visible"]["gui"]:
                self.model.status["visible"]["gui"] = self.isVisible()
                self.output.emit({"visible": {"gui": self.isVisible()}})
        
            if self.qw_login.isVisible() != self.model.status["visible"]["login"]:
                self.model.status["visible"]["login"] = self.qw_login.isVisible()
                self.output.emit({"visible": {"login": self.qw_login.isVisible()}})

            if self.qw_scanner.isVisible() != self.model.status["visible"]["scanner"]:
                self.model.status["visible"]["scanner"] = self.qw_scanner.isVisible()
                self.output.emit({"visible": {"scanner": self.qw_scanner.isVisible()}})

            if self.pop_out.isVisible() != self.model.status["visible"]["pop_out"]:
                self.model.status["visible"]["pop_out"] = self.pop_out.isVisible()
                self.output.emit({"visible": {"pop_out": self.pop_out.isVisible()}})

        except Exception as ex:
            print("status() exception: ", ex)

    @pyqtSlot()
    def login (self):
        try:
            text = self.qw_login.ui.lineEdit.text()
            if len(text) > 0: 
                self.output.emit({"ID":text})
                self.qw_login.ui.lineEdit.setPlaceholderText("Código de acceso")
            else:
                self.qw_login.ui.lineEdit.setPlaceholderText("Código vacío intenta de nuevo.")
            self.qw_login.ui.lineEdit.clear()
            self.qw_login.ui.lineEdit.setFocus()
        except Exception as ex:
            print("login() exception: ", ex)

    @pyqtSlot()
    def scanner (self):
        try:
            text = self.qw_scanner.ui.lineEdit.text()
            if len(text) > 0: 
                self.output.emit({"code":text})
                self.qw_scanner.ui.lineEdit.setPlaceholderText("Código Qr")
            else:
                self.qw_scanner.ui.lineEdit.setPlaceholderText("Código vacío intenta de nuevo.")
            self.qw_scanner.ui.lineEdit.clear()
            self.qw_scanner.ui.lineEdit.setFocus()
        except Exception as ex:
            print("scanner exception:", ex)

    @pyqtSlot(dict)
    def input(self, message):
        try:
            if "shutdown" in message:
                if message["shutdown"] == True:
                    self.shutdown = True
                    QTimer.singleShot(4000, self.close)
            if "allow_close" in message:
                if type(message["allow_close"]) == bool:
                    self.allow_close = message["allow_close"]
                else:
                    raise ValueError('allow_close must a boolean.')
            if "cycle_started" in message:
                if type(message["cycle_started"]) == bool:
                    self.cycle_started = message["cycle_started"]
                else:
                    raise ValueError('allow_close must a boolean.')
            if "request" in message:
                if message["request"] == "status":
                    QTimer.singleShot(100, self.sendStatus)
            if "popout_relay" in message:

                if "text" in message["popout_relay"]:
                    if message["popout_relay"]["text"] == "close":
                        print("Ocultando ventanas de mensajes pop_out_manual y qw_img_popout")
                        #self.pop_out_manual.close() #cuando tienen el método def closeEvent(self, event): event.ignore() no se pueden cerrar las ventanas tampoco usando close
                        #self.qw_img_popout.close() #pero si se pueden ocultar y volver a mostrar
                        self.pop_out_manual.hide()
                        self.qw_img_popout.hide()
                    else:
                        self.qw_img_popout.ui.label.setPixmap(QPixmap(self.model.imgsPath + "RELMANUAL.jpg")) #.scaled((QSize(300,300)), Qt.KeepAspectRatio))

                        #se acomoda el tamaño de la imágen a mostrar y de la ventana donde se muestra
                        self.qw_img_popout.ui.label.setMinimumSize(QSize(0, 0))
                        self.qw_img_popout.ui.label.setMaximumSize(QSize(300, 470)) #ancho, alto, valores máximos
                        self.qw_img_popout.ui.MainWindow.resize(320, 490) #se le hace un resize para acomodar el tamaño de la ventana (ancho,alto)

                        #para obtener la resolución de la pantalla:
                        user32 = ctypes.windll.user32
                        user32.SetProcessDPIAware()
                        width_screen_resolution  = user32.GetSystemMetrics(0)
                        heigth_screen_resolution = user32.GetSystemMetrics(1)

                        #para obtener la posición en X que debe tener la ventana
                        img_popout_ubic = width_screen_resolution - self.qw_img_popout.ui.MainWindow.size().width() - 5

                        #para mover de posición la pantalla y posteriormente mostrarla
                        self.qw_img_popout.move(img_popout_ubic,55) # posiciónX(+ es derecha), posiciónY(+ es abajo)
                        self.qw_img_popout.show()

                        #se modifica el estilo del texto y se muestra
                        #self.pop_out_manual.setStyleSheet("QLabel{min-width: 800px; min-height: 80;font: 18pt; color: " + message["popout_relay"]["color"] + ";} QPushButton{ width:50px; font: 10pt;}")
                        self.pop_out_manual.setStyleSheet("QLabel{min-width: 800px; min-height: 120;font: 18pt; color: " + message["popout_relay"]["color"] + ";}")
                        self.pop_out_manual.MainWindow.resize(800, 120)
                        self.pop_out_manual.label.setText(message["popout_relay"]["text"])
                        self.pop_out_manual.setWindowTitle("INSTRUCCIÓN")

                        #se mueve de posición la pantalla y se ejecuta mensaje de poput
                        self.pop_out_manual.move(400,20) # posiciónX, posiciónY
                        self.pop_out_manual.show()
                        self.pop_out_manual.setFocusPolicy(Qt.StrongFocus)

            if "lbl_info0" in message:
                self.ui.lbl_info0.setText(message["lbl_info0"]["text"])
                if "color" in message["lbl_info0"]:
                    self.ui.lbl_info0.setStyleSheet("color: " + message["lbl_info0"]["color"])
            if "lbl_info1" in message:
                self.ui.lbl_info1.setText(message["lbl_info1"]["text"])
                if "color" in message["lbl_info1"]:
                    self.ui.lbl_info1.setStyleSheet("color: " + message["lbl_info1"]["color"])
            if "lbl_info2" in message:
                self.ui.lbl_info2.setText(message["lbl_info2"]["text"])
                if "color" in message["lbl_info2"]:
                    self.ui.lbl_info2.setStyleSheet("color: " + message["lbl_info2"]["color"])
            if "lbl_info3" in message:
                self.ui.lbl_info3.setText(message["lbl_info3"]["text"])
                if "color" in message["lbl_info3"]:
                    self.ui.lbl_info3.setStyleSheet("color: " + message["lbl_info3"]["color"])
            if "lbl_info4" in message:
                self.ui.lbl_info4.setText(message["lbl_info4"]["text"])
                if "color" in message["lbl_info4"]:
                    self.ui.lbl_info4.setStyleSheet("color: " + message["lbl_info4"]["color"])
            if "lbl_nuts" in message:
                self.ui.lbl_nuts.setText(message["lbl_nuts"]["text"])
                if "color" in message["lbl_nuts"]:
                    self.ui.lbl_nuts.setStyleSheet("color: " + message["lbl_nuts"]["color"])
            ###########################################################################
            if "lbl_box1" in message:
                self.ui.lbl_box1.setText(message["lbl_box1"]["text"])
                if "color" in message["lbl_box1"]:
                    self.ui.lbl_box1.setStyleSheet("color: " + message["lbl_box1"]["color"])
            if "lbl_box2" in message:
                self.ui.lbl_box2.setText(message["lbl_box2"]["text"])
                if "color" in message["lbl_box2"]:
                    self.ui.lbl_box2.setStyleSheet("color: " + message["lbl_box2"]["color"])
            if "lbl_box3" in message:
                self.ui.lbl_box3.setText(message["lbl_box3"]["text"])
                if "color" in message["lbl_box3"]:
                    self.ui.lbl_box3.setStyleSheet("color: " + message["lbl_box3"]["color"])
            if "lbl_box4" in message:
                self.ui.lbl_box4.setText(message["lbl_box4"]["text"])
                if "color" in message["lbl_box4"]:
                    self.ui.lbl_box4.setStyleSheet("color: " + message["lbl_box4"]["color"])
            if "lbl_box5" in message:
                self.ui.lbl_box5.setText(message["lbl_box5"]["text"])
                if "color" in message["lbl_box5"]:
                    self.ui.lbl_box5.setStyleSheet("color: " + message["lbl_box5"]["color"])
            if "lbl_box6" in message:
                self.ui.lbl_box6.setText(message["lbl_box6"]["text"])
                if "color" in message["lbl_box6"]:
                    self.ui.lbl_box6.setStyleSheet("color: " + message["lbl_box6"]["color"])
            ######### Modificación para F96 #########
            if "lbl_box7" in message:
                self.ui.lbl_box7.setText(message["lbl_box7"]["text"])
                if "color" in message["lbl_box7"]:
                    self.ui.lbl_box7.setStyleSheet("color: " + message["lbl_box7"]["color"])
            ######### Modificación para F96 #########
            ###########################################################################
            if "lbl_result" in message:
                self.ui.lbl_result.setText(message["lbl_result"]["text"])
                if "color" in message["lbl_result"]:
                    self.ui.lbl_result.setStyleSheet("color: " + message["lbl_result"]["color"])
                if "color" in message["lbl_result"] and "font" in message["lbl_result"]:
                    self.ui.lbl_result.setStyleSheet("color: " + message["lbl_result"]["color"] + ";" + "font: " + message["lbl_result"]["font"])
            if "lbl_steps" in message:
                self.ui.lbl_steps.setText(message["lbl_steps"]["text"])
                if "color" in message["lbl_steps"]:
                    self.ui.lbl_steps.setStyleSheet("color: " + message["lbl_steps"]["color"])
                if "color" in message["lbl_steps"] and "font" in message["lbl_steps"]:
                    self.ui.lbl_steps.setStyleSheet("color: " + message["lbl_steps"]["color"] + ";" + "font: " + message["lbl_steps"]["font"])
            if "lbl_user" in message:
                self.ui.lbl_user.setText(message["lbl_user"]["type"] + "\n" + message["lbl_user"]["user"])
                if "color" in message["lbl_user"]:
                    self.ui.lbl_user.setStyleSheet("color: " + message["lbl_user"]["color"])
                self.model.user = message["lbl_user"]
                self.qw_login.setVisible(False)
            if "img_user" in message:
                 if message["img_user"] != "":
                    if exists(self.model.imgsPath + "users/" + message["img_user"]):
                        self.ui.img_user.setPixmap(QPixmap(self.model.imgsPath + "users/" + message["img_user"]).scaled(110, 110, Qt.KeepAspectRatio))
                    else:
                        self.ui.img_user.setPixmap(QPixmap(":/images/images/usuario_x.jpg").scaled(110, 110, Qt.KeepAspectRatio))
            if "img_nuts" in message:
                if message["img_nuts"] != "":
                    if exists(self.model.imgsPath + message["img_nuts"]):
                        self.ui.img_nuts.setPixmap(QPixmap(self.model.imgsPath + message["img_nuts"]).scaled(110, 110, Qt.KeepAspectRatio))
            if "img_center" in message: 
               if message["img_center"] != "":
                    if exists(self.model.imgsPath + message["img_center"]):
                        self.model.centerImage = self.model.imgsPath + message["img_center"]
                        self.ui.img_center.setPixmap(QPixmap(self.model.centerImage).scaled(self.ui.img_center.width(), self.ui.img_center.height(), Qt.KeepAspectRatio))
            ######### Modificación para F96 #########
            if "img_fuse" in message: 
               if message["img_fuse"] != "":
                    if exists(self.model.imgsPath + message["img_fuse"]):
                        self.model.img_fuse = self.model.imgsPath + message["img_fuse"]
                        self.ui.img_fuse.setPixmap(QPixmap(self.model.img_fuse).scaled(self.ui.img_fuse.width(), self.ui.img_center.height(), Qt.KeepAspectRatio))
            ######### Modificación para F96 #########
            if "show" in message:
                self.launcher(message["show"])         
            if "popOut" in message:
                self.launcher(message) 
            if "statusBar" in message:
                if type(message["statusBar"]) == str:
                    if message["statusBar"] == "clear":
                        self.ui.statusbar.clearMessage()
                    else:
                        self.ui.statusbar.showMessage(message["statusBar"])
        except Exception as ex:
            print("\ninput() exception : \nMessage: ", message, "\nException: ", ex)
            self.output.emit({"Exception":"Input error"})
    
    @pyqtSlot()
    def launcher(self, show):
        try:
            if "login" in show:
                self.qw_login.ui.lineEdit.setPlaceholderText("Escanea o escribe tu codigo")
                self.qw_login.setVisible(show["login"])
            if "scanner" in show:
                self.qw_scanner.ui.lineEdit.setPlaceholderText("Escanea el Código Qr")
                self.qw_scanner.setVisible(show["scanner"])
            if "popOut" in show:
                if show["popOut"] == "close" and self.pop_out.isVisible: 
                    self.pop_out.button(QMessageBox.Ok).click()
                else:
                    self.pop_out.setText(show["popOut"])
                    self.pop_out.setWindowTitle("Info")
                    self.pop_out.exec()
            if "img_popOut" in show:
                if show["img_popOut"] == "close":
                    self.qw_img_popout.ui.label.setPixmap(QPixmap(":/images/images/blanco.png"))
                    self.qw_img_popout.close()
                else:
                    self.qw_img_popout.ui.label.setPixmap(QPixmap(self.model.imgsPath + show["img_popOut"]))
                    self.qw_img_popout.show()
        except Exception as ex:
            print("launcher exception: ", ex)

    @pyqtSlot()
    def sendStatus (self):
        try:
            self.output.emit(self.model.status)
        except Exception as ex:
            print("sendStatus() exception: ", ex)

    @pyqtSlot()
    def resizeEvent(self, event):
        try:
            self.ui.img_center.setPixmap(QPixmap(self.model.centerImage).scaled(self.ui.img_center.width(), self.ui.img_center.height(), Qt.KeepAspectRatio))
            #print("[1]", self.width()-self.ui.frame.width())
            self.ui.frame.setMaximumWidth(self.width() - 328)
            #print("[2]", self.width()-self.ui.frame.width())
            ### F96 ###
            self.ui.img_fuse.setPixmap(QPixmap(self.model.img_fuse).scaled(self.ui.img_fuse.width(), self.ui.img_fuse.height(), Qt.KeepAspectRatio))
            #print("[1]", self.width()-self.ui.frame.width())
            self.ui.frame.setMaximumWidth(self.width() - 328)
        except Exception as ex:
            print("resizeEvent() exception: ", ex)

    @pyqtSlot()
    def closeEvent(self, event):
        if self.shutdown == True:
            self.timer.stop()
            self.output.emit({"gui": False})
            print ("Bye...")
            event.accept()
            self.deleteLater()
        elif self.allow_close == True:
            choice = QMessageBox.question(self, 'Salir', "Estas seguro de cerrar la aplicacion?",QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
            if choice == QMessageBox.Yes:
                self.timer.stop()
                self.output.emit({"gui": False})
                self.closed.emit()
                self.deleteLater()
                print ("Bye...")
                event.accept()
            else:
                event.ignore()
        else:
            event.ignore()
            self.pop_out.setText("No se permite cerrar esta ventana")
            self.pop_out.setWindowTitle("Warning")
            QTimer.singleShot(2000, self.pop_out.button(QMessageBox.Ok).click)
            self.pop_out.exec()


class Login (QDialog):
    def __init__(self, parent = None):
        super().__init__(parent)
        self.ui = login.Ui_login()
        self.ui.setupUi(self)
        self.ui.lineEdit.setEchoMode(QLineEdit.Password)
        self.ui.lineEdit.setStyleSheet('lineedit-password-character: 9679')
        self.ui.btn_ok.setFocusPolicy(Qt.NoFocus)
        self.ui.lineEdit.setFocus()

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Escape:
            print("Escape key was pressed")
     
            
class Scanner (QDialog):
    def __init__(self, parent = None):
        super().__init__(parent)
        self.ui = scanner.Ui_scanner()
        self.ui.setupUi(self) 

        self.ui.lineEdit.setEchoMode(QLineEdit.Password)
        self.ui.lineEdit.setStyleSheet('lineedit-password-character: 9679')

        self.ui.btn_ok.setFocusPolicy(Qt.NoFocus)
        self.ui.btn_cancel.setFocusPolicy(Qt.NoFocus)
        self.ui.lineEdit.setFocus()

    def closeEvent(self, event):
        event.ignore() 

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Escape:
            print("Escape key was pressed")


class Img_popout (QDialog):
    def __init__(self, parent = None):
        super().__init__(parent)
        self.ui = img_popout.Ui_img_popout()
        self.ui.setupUi(self)
        self.ui.label.setText("")

    def closeEvent(self, event):
        event.ignore() 
        

#class PopOutManual (QMessageBox):   #este tipo de class con base de QMessageBox ya trae por defecto un botón "OK"
class PopOutManual (QDialog):
    def __init__(self, parent = None):
        super().__init__(parent)

        self.MainWindow = QtWidgets.QWidget(self)
        self.MainWindow.setObjectName("MainWindow")
        self.label = QtWidgets.QLabel(self.MainWindow)
        #self.setIcon(QMessageBox.Information)
        #self.setStandardButtons(QMessageBox.Ok)
        #self.button(QMessageBox.Ok).setVisible(False)

    def closeEvent(self, event):
        event.ignore() 


class PopOut (QMessageBox):
    def __init__(self, parent = None):
        super().__init__(parent)

        self.setStyleSheet("font: 40pt; color: orangered; font-weight: bold; background-color: rgb(0,0,0);")

        self.setIcon(QMessageBox.Information)
        self.setStandardButtons(QMessageBox.Ok)
        self.button(QMessageBox.Ok).setVisible(False)


    def closeEvent(self, event):
        event.ignore() 

    def keyPressEvent(self, event):
        if event.key() == Qt.Key_Escape:
            print("Escape key was pressed")


if __name__ == "__main__":
    from PyQt5.QtWidgets import QApplication
    import sys
    app = QApplication(sys.argv)
    gui = MainWindow(name = "EIAF-MBI")
    gui.ready.connect(gui.showMaximized)
    sys.exit(app.exec_())
    

    
