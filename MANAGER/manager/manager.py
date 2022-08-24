"""
Authors: MC Marco Rutiaga
         MC Aarón Castillo (master en comentarios)
         Ing Rogelio García (master en API)
         MC César Velázquez (master en cuidado de pinzas)

pyinstaller --add-data data;data manager.py
"""
from gui import MainWindow
from controller import Controller

class Manager(MainWindow):

    def __init__(self, name = "EIAF-MBI", topic = "gui", menuMode = True, parent = None):
        super().__init__(name = name, topic = topic, menuMode = menuMode, parent = parent)
        
        self.controller = Controller(self)

        self.ready.connect(self.showMaximized)
        self.ready.connect(self.controller.start)

if __name__ == "__main__":
    from PyQt5.QtWidgets import QApplication
    import sys
    app = QApplication(sys.argv)
    manager = Manager(name = "EIAF-MBI")
    sys.exit(app.exec_())