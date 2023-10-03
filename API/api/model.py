from datetime import datetime, timedelta, date, time

class model(object):
    def __init__(self, parent=None):
        self.host = "127.0.0.1"
        self.user = "admin"
        self.password = "4dm1n_001"
        self.database = "eiaf"
        
        #self.host = "10.71.88.139"
        #self.user = "dedicado"

        self.serverp2 = "NAAPNX-FAMX4"
        self.dbp2 = "agrucomb_prod"
        self.userp2 = "pnx_agrucomb_prod"
        self.passwordp2 = "pJ0rge2021"
    def datos_acceso(self):
        return self.host, self.user,self.password,self.database,self.serverp2,self.dbp2,self.userp2,self.passwordp2

            #userp2 = "pnx-atmc"
            #passwordp2 = "fujikuraamtc" #Antiguas credenciales Limitadas (No funcionan para Trazabilidad)