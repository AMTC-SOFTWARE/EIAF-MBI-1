from cv2 import imread, imwrite, rectangle
from datetime import datetime
from time import strftime
from pickle import load
import requests
import json

from PyQt5.QtCore import QState, pyqtSignal, QObject
from paho.mqtt import publish
from threading import Timer


class Model (object):

    def __init__(self, parent = None):
        self.no_serie = "EIAF-MBI-X296"
        self.QR = "--"
        self.shutdown = False
        self.main_window = None
        self.transitions = None
        self.datetime = None
        self.imgs_path = "data/imgs/"
        self.server =  "127.0.0.1:5000"
        self.last_log = ""
        self.flag = False
        self.pdcr_mid = False
        self.imgs = {}
        self.retries = {}
        self.id_HM = None

        ###############################################################
        self.robothome_a = False
        self.robothome_b = False
        self.cajas_robot_a = False
        self.cajas_robot_b = False
        self.contador_error = 0 #para contar las veces que entra al estado error de inserción
        self.max_reintentos = 3 #se define el mayor número de reintentos posibles
        self.screen_cont = 3    #contador para mostrar cuenta regresiva
        self.screen_cont_reset = 3 #valor debe ser igual a screen_cont, reinicia la variable
        self.fusible_manual = False #bandera para saber que se requiere llave para continuar
        self.var_queue = 0 #variable para ir obteniendo fusibles de principio o fin de lista de triggers
        self.acomodo_listas = True #variable para hacer acomodo de listas de fusibles a insertar

        self.detener_robot_opuesto = False

        self.shared_zone = ""

        self.current_thread_robot = ""
        self.robots_mode = 0
        self.thread_robot = False

        self.acomodo_listas_2 = True #variable para hacer acomodo de listas de fusibles a insertar
        self.init_thread_robot = False
        self.retry_thread_robot = False
        self.set_thread_robot = False
        self.trigger_thread_robot = False
        self.finish_thread_robot = False
        self.loaded_thread_robot = False
        self.inserted_thread_robot = False
        self.error_thread_robot = False
        self.contador_error_2 = 0 #para contar las veces que entra al estado error de inserción
        self.max_reintentos_2 = 3 #se define el mayor número de reintentos posibles
        self.screen_cont_reset_2 = 3 #valor debe ser igual a screen_cont, reinicia la variable
        self.fusible_manual_2 = False #bandera para saber que se requiere llave para continuar
        self.limite_reintentos_thread = False
        self.llave_thread = False
        self.waiting_key_thread = False
        self.robot_principal = False
        self.var_queue_2 = 0 #variable para ir obteniendo fusibles de principio o fin de lista de triggers
        ###############################################################

        #Variable para guardar todos los tiempos de inserción de fusibles
        self.insertion_times = {}

        self.fuses_BB = {
            'PDC-D': {
                'F200': [(271, 572), (300, 583)], 'F201': [(270, 555), (301, 567)], 'F202': [(274, 540), (304, 548)], 'F203': [(272, 523), (301, 533)], 
                'F204': [(270, 504), (300, 516)], 'F205': [(271, 490), (300, 499)], 'F206': [(272, 471), (302, 483)], 'F207': [(270, 455), (302, 465)], 
                'F208': [(274, 438), (302, 451)], 'F209': [(367, 573), (418, 584)], 'F210': [(368, 553), (417, 567)], 'F211': [(367, 536), (417, 551)], 
                'F212': [(369, 520), (417, 533)], 'F213': [(370, 504), (417, 515)], 'F214': [(368, 486), (416, 498)], 'F215': [(367, 470), (417, 482)], 
                'F216': [(366, 451), (417, 466)], 'F217': [(292, 401), (307, 411)], 'F218': [(292, 385), (308, 395)], 'F219': [(291, 368), (307, 379)], 
                'F220': [(293, 351), (306, 360)], 'F221': [(293, 334), (308, 344)], 'F222': [(342, 402), (356, 413)], 'F223': [(342, 383), (355, 395)], 
                'F224': [(343, 366), (354, 377)], 'F225': [(344, 349), (355, 362)], 'F226': [(343, 332), (356, 343)], 'F227': [(377, 417), (388, 427)], 
                'F228': [(376, 401), (388, 413)], 'F229': [(377, 386), (388, 392)], 'F230': [(378, 367), (390, 377)], 'F231': [(374, 350), (388, 362)], 
                'F232': [(376, 333), (389, 344)]
                }, 
            'PDC-P': {
                'MF1': [(279, 276), (369, 288)], 'MF2': [(279, 295), (369, 307)], 'F300': [(282, 395), (326, 408)], 'F301': [(289, 380), (315, 390)], 
                'F302': [(289, 365), (314, 375)], 'F303': [(292, 350), (314, 361)], 'F304': [(291, 335), (315, 347)], 'F305': [(292, 322), (314, 331)], 
                'F318': [(341, 428), (365, 437)], 'F319': [(342, 415), (366, 423)], 'F320': [(343, 400), (365, 408)], 'F321': [(342, 384), (367, 393)], 
                'F322': [(344, 368), (366, 379)], 'F323': [(342, 354), (366, 364)], 'F324': [(344, 340), (366, 348)], 'F325': [(343, 326), (368, 335)], 
                'F326': [(378, 427), (422, 438)], 'F327': [(379, 413), (422, 425)], 'F328': [(379, 398), (423, 409)], 'F329': [(380, 384), (424, 395)], 
                'F330': [(380, 369), (422, 380)], 'F331': [(380, 354), (422, 364)], 'F332': [(381, 339), (422, 349)], 'F333': [(380, 324), (422, 335)], 
                'F334': [(380, 309), (422, 319)], 'F335': [(380, 294), (422, 307)], 'E21': [(287, 423), (295, 441)], 'E22': [(295, 442), (302, 460)]
                }, 
            'PDC-R': {
                'F400': [(510, 214), (519, 246)], 'F401': [(499, 214), (508, 246)], 'F402': [(487, 214), (497, 246)], 'F403': [(477, 214), (485, 246)], 
                'F404': [(467, 214), (475, 246)], 'F405': [(455, 214), (464, 246)], 'F411': [(385, 220), (392, 241)], 'F410': [(395, 220), (402, 241)], 
                'F409': [(403, 220), (412, 241)], 'F408': [(414, 220), (421, 241)], 'F407': [(423, 220), (432, 241)], 'F406': [(434, 220), (443, 241)], 
                'F412': [(527, 222), (558, 231)], 'F413': [(527, 211), (558, 220)], 'F414': [(527, 204), (558, 213)], 'F415': [(527, 193), (558, 202)], 
                'F416': [(527, 182), (558, 191)], 'F417': [(527, 171), (558, 180)], 'F420': [(326, 171), (374, 186)], 'F419': [(326, 195), (374, 210)], 
                'F418': [(326, 217), (374, 232)], 'F421': [(527, 144), (558, 153)], 'F422': [(527, 133), (558, 142)], 'F423': [(527, 122), (558, 131)], 
                'F424': [(527, 111), (558, 120)], 'F425': [(527, 102), (558, 111)], 'F426': [(527, 91),  (558, 100)], 'F427': [(495, 133), (504, 153)], 
                'F428': [(485, 133), (494, 153)], 'F429': [(475, 133), (484, 153)], 'F430': [(465, 133), (474, 153)], 'F431': [(453, 133), (462, 153)], 
                'F437': [(496, 111), (505, 130)], 'F438': [(487, 111), (495, 130)], 'F439': [(476, 111), (485, 130)], 'F440': [(465, 111), (474, 130)], 
                'F441': [(455, 111), (464, 130)], 'F432': [(432, 133), (441, 153)], 'F433': [(421, 133), (430, 153)], 'F434': [(410, 133), (419, 153)], 
                'F435': [(399, 133), (408, 153)], 'F436': [(388, 133), (397, 153)], 'F442': [(431, 111), (440, 130)], 'F443': [(420, 111), (429, 130)], 
                'F444': [(410, 111), (419, 129)], 'F445': [(399, 111), (408, 130)], 'F446': [(389, 111), (398, 130)], 'F449': [(326, 88),  (374, 104)], 
                'F448': [(326, 112), (374, 128)], 'F447': [(326, 137), (374, 153)], 'F450': [(512, 72),  (521, 103)], 'F451': [(501, 72),  (510, 103)], 
                'F452': [(490, 72),  (499, 103)], 'F453': [(479, 72),  (488, 103)], 'F454': [(469, 72),  (478, 103)], 'F455': [(458, 72),  (467, 103)], 
                'F456': [(435, 72),  (444, 103)], 'F457': [(424, 72),  (433, 103)], 'F458': [(413, 72),  (422, 103)], 'F459': [(402, 72),  (411, 103)], 
                'F460': [(391, 72),  (400, 103)], 'F461': [(380, 72),  (389, 103)], 'F462': [(240, 166), (256, 215)], 'F463': [(215, 166), (231, 215)], 
                'F464': [(191, 166), (207, 215)], 'F465': [(277, 107), (297, 115)], 'F466': [(277, 97),  (297, 105)], 'F467': [(277, 86),  (297, 94)], 
                'F468': [(277, 75),  (297, 83)],  'F469': [(277, 64),  (297, 72)],  'F470': [(277, 53),  (297, 61)],  'F471': [(231, 107), (264, 115)], 
                'F472': [(231, 97),  (264, 105)], 'F473': [(231, 86),  (264, 94)],  'F474': [(231, 75),  (264, 83)],  'F475': [(231, 64),  (264, 72)], 
                'F476': [(231, 53),  (264, 61)],  'F477': [(187, 107), (220, 115)], 'F478': [(187, 97),  (220, 105)], 'F479': [(187, 86),  (220, 94)], 
                'F480': [(187, 75),  (220, 83)],  'F481': [(187, 64),  (220, 71)],  'F482': [(187, 53),  (220, 61)],  'RELX': [(478, 162), (525, 206)], 
                'RELU': [(427, 162), (476, 206)], 'RELT': [(378, 162), (425, 206)]
                },
            'PDC-RMID': {
                'F400': [(613, 350), (627, 388)], 'F401': [(601, 350), (612, 388)], 'F402': [(587, 350), (599, 388)], 'F403': [(577, 350), (588, 388)], 
                'F404': [(565, 350), (576, 388)], 'F405': [(553, 350), (564, 388)], 'F411': [(463, 357), (474, 378)], 'F410': [(475, 357), (486, 378)], 
                'F409': [(487, 357), (496, 378)], 'F408': [(497, 357), (510, 378)], 'F407': [(512, 357), (523, 378)], 'F406': [(525, 357), (534, 378)], 
                'F412': [(633, 360), (673, 371)], 'F413': [(633, 348), (673, 359)], 'F414': [(633, 335), (673, 346)], 'F415': [(633, 323), (673, 334)], 
                'F416': [(633, 311), (673, 322)], 'F417': [(633, 297), (673, 308)], 'F420': [(398, 300), (455, 318)], 'F419': [(398, 330), (455, 348)], 
                'F418': [(398, 358), (455, 376)], 'F421': [(634, 272), (671, 284)], 'F422': [(634, 256), (671, 269)], 'F423': [(634, 244), (671, 255)], 
                'F424': [(634, 229), (671, 241)], 'F425': [(634, 217), (671, 228)], 'F426': [(634, 204), (671, 216)], 'F427': [(597, 256), (607, 280)], 
                'F428': [(585, 256), (595, 280)], 'F429': [(573, 256), (583, 280)], 'F430': [(561, 256), (571, 280)], 'F431': [(547, 256), (557, 280)], 
                'F437': [(600, 228), (610, 252)], 'F438': [(587, 228), (597, 252)], 'F439': [(575, 228), (585, 252)], 'F440': [(563, 228), (573, 252)], 
                'F441': [(550, 228), (560, 252)], 'F432': [(520, 256), (530, 280)], 'F433': [(508, 256), (518, 280)], 'F434': [(496, 256), (506, 280)], 
                'F435': [(484, 256), (494, 280)], 'F436': [(472, 256), (482, 280)], 'F442': [(518, 228), (528, 252)], 'F443': [(506, 228), (516, 252)], 
                'F444': [(494, 228), (504, 252)], 'F445': [(481, 228), (491, 252)], 'F446': [(469, 228), (479, 252)], 'F450': [(616, 180), (628, 218)], 
                'F451': [(604, 180), (615, 218)], 'F452': [(592, 180), (602, 218)], 'F453': [(577, 180), (589, 218)], 'F454': [(564, 180), (576, 218)], 
                'F455': [(553, 180), (563, 218)], 'F456': [(525, 180), (535, 218)], 'F457': [(514, 180), (524, 218)], 'F458': [(500, 180), (513, 218)], 
                'F459': [(487, 180), (497, 218)], 'F460': [(473, 180), (486, 218)], 'F461': [(463, 180), (474, 218)], 'RELX': [(578, 291), (629, 348)], 
                'RELU': [(517, 291), (573, 348)], 'RELT': [(461, 291), (512, 348)], 'F449': [(398, 200), (455, 224)], 'F448': [(398, 232), (455, 250)], 
                'F447': [(398, 260), (455, 278)]
                },
            'F96_box':{
                'F96':[(257, 346), (480, 417)]
                },
            'PDC-S': {
                '1': [(439, 218), (486, 392)], '2': [(494, 218), (540, 389)], '3': [(550, 218), (596, 387)], '4': [(607, 219), (653, 387)], 
                '5': [(661, 218), (711, 382)], '6': [(719, 218), (763, 380)]
                }, 
            'TBLU': {
                '9': [(79, 531), (117, 600)], '8': [(125, 532), (159, 599)], '7': [(167, 532), (207, 599)], '6': [(212, 532), (251, 600)], 
                '5': [(257, 531), (296, 600)], '4': [(300, 530), (338, 601)], '3': [(347, 533), (385, 600)], '2': [(388, 531), (428, 598)], 
                '1': [(435, 531), (472, 600)]
                }
            }

        self.local_data = {
            "user": {"type":"", "pass":"", "name":""},
            "lbl_info1_text": "",
            "lbl_info2_text": "",
            "lbl_info3_text": "",
            "lbl_info4_text": "",
            "qr_rework" : False
            }

        self.sub_topics = {
            "GDI": "GDI/status",
            "keyboard": "Keyboard/status",
            "plc": "PLC/1/status",
            "gui": "gui/status",
            "config": "config/status",
            "robot_a": "RobotEpson/3/status",
            "robot_b": "RobotEpson/4/status",

            "color_sensor_a": "color_sensor/a/status",
            "color_sensor_b": "color_sensor/b/status"
            }

        self.pub_topics = {
            "gui": "gui/set",
            "plc": "PLC/1",
            "printer": "Printer/5",
            "config": "config/set",
            "robot_a": "RobotEpson/3",
            "robot_b": "RobotEpson/4",

            "color_sensor_a": "color_sensor/a/set",
            "color_sensor_b": "color_sensor/b/set"
            }

        self.config_data = {
            "trazabilidad": True
        }
  
        self.codes = {
            "FET": "",
            "HM": "",
            "REF": ""
            }
        #self.model.database["clamps"] contiene los clamps necesarios para el arnés escaneado
        self.database = {
            "orden": {},
            "clamps": [],
            "fuses": {}
            }

        self.gui ={
            "request": "", 
            "ID": "", 
            "code": "", 
            "visible":{}
            }
        #self.model.plc["clamps"] es donde se guardan los clamps que ya se realizaron correctamente
        self.plc = {
            "emergency": True,
            "retry_btn": False,
            "clamps": ["CAJA_1", "CAJA_2"],
            "error": ""
            }

        self.robots = {
            "robot_a": {
                "queueIzq": [],
                "queueDer": [],
                "current_trig": None,
                "pose": "",
                "img": None,
                "ready": False,
                "retry": False,
                "error": ""
                },
            "robot_b": {
                "queueIzq": [],
                "queueDer": [],
                "current_trig": None,
                "pose": "",
                "img": None,
                "ready": False,
                "retry": False,
                "error": ""
                }
            }
        
        self.color_sensors = {
            "color_sensor_a":{
                "result": "--"
                },
            "color_sensor_b":{
                "result": "--"
                }
            }

        self.AfusesIzq = ['MINI,5,beige','MINI,15,blue','MULTI,7.5,brown','ATO,5,beige','ATO,15,blue','MULTI,5,beige','ATO,10,red']
        self.AfusesDer = ['ATO,30,green','ATO,25,white','ATO,7.5,brown','MINI,7.5,brown','MINI,10,red']
        self.BfusesIzq = ['MINI,5,beige','MINI,7.5,brown','MINI,10,red','ATO,25,white','ATO,7.5,brown','ATO,15,blue_clear','MINI,15,blue','MAXI,50,red']
        self.BfusesDer = ['RELAY,60,red','RELAY,70,gray','MAXI,40,amber','MAXI,30,green','ATO,30,green','ATO,10,red_clear','ATO,5,beige_clear','ATO,20,yellow','ATO,5,beige','ATO,10,red','ATO,15,blue']
        self.popQueueIzq = False
        self.popQueueDer = False
        self.popQueueIzq_2 = False
        self.popQueueDer_2 = False
        self.databaseTempModel = []

    def fusesInit(self):
        self.database["fuses"] = {
            'PDC-D': {
                'F200': 'empty', 'F201': 'empty', 'F202': 'empty', 'F203': 'empty', 'F204': 'empty', 'F205': 'empty', 'F206': 'empty', 'F207': 'empty', 'F208': 'empty',
                'F209': 'empty', 'F210': 'empty', 'F211': 'empty', 'F212': 'empty', 'F213': 'empty', 'F214': 'empty', 'F215': 'empty', 'F216': 'empty', 'F217': 'empty',
                'F218': 'empty', 'F219': 'empty', 'F220': 'empty', 'F221': 'empty', 'F222': 'empty', 'F223': 'empty', 'F224': 'empty', 'F225': 'empty', 'F226': 'empty',
                'F227': 'empty', 'F228': 'empty', 'F229': 'empty', 'F230': 'empty', 'F231': 'empty', 'F232': 'empty'
                }, 
            'PDC-P': {
                'MF1': 'empty', 'MF2': 'empty', 'F301': 'empty', 'F302': 'empty', 'F303': 'empty', 'F304': 'empty', 'F305': 'empty', 'F300': 'empty', 'F318': 'empty',
                'F319': 'empty', 'F320': 'empty', 'F321': 'empty', 'F322': 'empty', 'F323': 'empty', 'F324': 'empty', 'F325': 'empty', 'F326': 'empty', 'F327': 'empty',
                'F328': 'empty', 'F329': 'empty', 'F330': 'empty', 'F331': 'empty', 'F332': 'empty', 'F333': 'empty', 'F334': 'empty', 'F335': 'empty', 'E21': 'empty',
                'E22': 'empty'
                }, 
            'PDC-R': {
                'F405': 'empty', 'F404': 'empty', 'F403': 'empty', 'F402': 'empty', 'F401': 'empty', 'F400': 'empty', 'F411': 'empty', 'F410': 'empty', 'F409': 'empty',
                'F408': 'empty', 'F407': 'empty', 'F406': 'empty', 'F412': 'empty', 'F413': 'empty', 'F414': 'empty', 'F415': 'empty', 'F416': 'empty', 'F417': 'empty',
                'F420': 'empty', 'F419': 'empty', 'F418': 'empty', 'F421': 'empty', 'F422': 'empty', 'F423': 'empty', 'F424': 'empty', 'F425': 'empty', 'F426': 'empty',
                'F430': 'empty', 'F431': 'empty', 'F437': 'empty', 'F438': 'empty', 'F439': 'empty', 'F440': 'empty', 'F441': 'empty', 'F432': 'empty', 'F433': 'empty', 
                'F436': 'empty', 'F442': 'empty', 'F443': 'empty', 'F444': 'empty', 'F445': 'empty', 'F446': 'empty', 'F449': 'empty', 'F448': 'empty', 'F447': 'empty', 
                'F450': 'empty', 'F451': 'empty', 'F452': 'empty', 'F453': 'empty', 'F454': 'empty', 'F455': 'empty', 'F456': 'empty', 'F457': 'empty', 'F458': 'empty',
                'F459': 'empty', 'F460': 'empty', 'F461': 'empty', 'F462': 'empty', 'F463': 'empty', 'F464': 'empty', 'F465': 'empty', 'F466': 'empty', 'F467': 'empty', 
                'F468': 'empty', 'F469': 'empty', 'F470': 'empty', 'F471': 'empty', 'F472': 'empty', 'F473': 'empty', 'F474': 'empty', 'F475': 'empty', 'F476': 'empty',
                'F477': 'empty', 'F478': 'empty', 'F479': 'empty', 'F480': 'empty', 'F481': 'empty', 'F482': 'empty', 'RELX': 'empty', 'RELU': 'empty', 'RELT': 'empty',
                'F96': 'empty'
                }, 
            'PDC-RMID': {
                'F400': 'empty', 'F401': 'empty', 'F402': 'empty', 'F403': 'empty', 'F404': 'empty', 'F405': 'empty', 'F411': 'empty', 'F410': 'empty', 'F409': 'empty',
                'F408': 'empty', 'F407': 'empty', 'F406': 'empty', 'F412': 'empty', 'F413': 'empty', 'F414': 'empty', 'F415': 'empty', 'F416': 'empty', 'F417': 'empty',
                'F420': 'empty', 'F419': 'empty', 'F418': 'empty', 'F421': 'empty', 'F422': 'empty', 'F423': 'empty', 'F424': 'empty', 'F425': 'empty', 'F426': 'empty',
                'F430': 'empty', 'F431': 'empty', 'F437': 'empty', 'F438': 'empty', 'F439': 'empty', 'F440': 'empty', 'F441': 'empty', 'F432': 'empty', 'F433': 'empty', 
                'F436': 'empty', 'F442': 'empty', 'F443': 'empty', 'F444': 'empty', 'F445': 'empty', 'F446': 'empty', 'F450': 'empty', 'F451': 'empty', 'F452': 'empty',
                'F453': 'empty', 'F454': 'empty', 'F455': 'empty', 'F456': 'empty', 'F457': 'empty', 'F458': 'empty', 'F459': 'empty', 'F460': 'empty', 'F461': 'empty',
                'F449': 'empty', 'F448': 'empty', 'F447': 'empty', 'RELX': 'empty', 'RELU': 'empty', 'RELT': 'empty', 'F96': 'empty'
                },
            'PDC-RS': {
                'F400': 'empty', 'F401': 'empty', 'F402': 'empty', 'F403': 'empty', 'F404': 'empty', 'F405': 'empty', 'F411': 'empty', 'F410': 'empty', 'F409': 'empty',
                'F408': 'empty', 'F407': 'empty', 'F406': 'empty', 'F412': 'empty', 'F413': 'empty', 'F414': 'empty', 'F415': 'empty', 'F416': 'empty', 'F417': 'empty',
                'F420': 'empty', 'F419': 'empty', 'F418': 'empty', 'F421': 'empty', 'F422': 'empty', 'F423': 'empty', 'F424': 'empty', 'F425': 'empty', 'F426': 'empty',
                'F430': 'empty', 'F431': 'empty', 'F437': 'empty', 'F438': 'empty', 'F439': 'empty', 'F440': 'empty', 'F441': 'empty', 'F432': 'empty', 'F433': 'empty', 
                'F436': 'empty', 'F442': 'empty', 'F443': 'empty', 'F444': 'empty', 'F445': 'empty', 'F446': 'empty', 'F450': 'empty', 'F451': 'empty', 'F452': 'empty',
                'F453': 'empty', 'F454': 'empty', 'F455': 'empty', 'F456': 'empty', 'F457': 'empty', 'F458': 'empty', 'F459': 'empty', 'F460': 'empty', 'F461': 'empty',
                'F449': 'empty', 'F448': 'empty', 'F447': 'empty', 'RELX': 'empty', 'RELU': 'empty', 'RELT': 'empty', 'F96': 'empty'
                },
            'PDC-S': {
                '1': 'empty', '2': 'empty', '3': 'empty', '4': 'empty', '5': 'empty', '6': 'empty'
                }, 
            'TBLU': {
                '1': 'empty', '2': 'empty', '3': 'empty', '4': 'empty', '5': 'empty', '6': 'empty', '7': 'empty', '8': 'empty', '9': 'empty'
                }
            }

    def reset (self):
        self.pdcr_mid = False
        self.flag = False
        self.retries.clear()
        for i in self.fuses_BB:
            try:
                self.imgs[i] = imread(self.imgs_path + "boxes/" + i + ".jpg")
                imwrite(self.imgs_path + i + ".jpg", self.imgs[i])
                #imwrite(self.imgs_path + i + "2.jpg", self.imgs[i])

            except Exception as ex:
                print("Reset exception: ", ex)
        for i in self.robots:
            self.robots[i]["queueIzq"].clear()
            self.robots[i]["queueDer"].clear()
            self.robots[i]["current_trig"] = None
            self.robots[i]["pose"] = ""
            self.robots[i]["img"] = None
            self.robots[i]["ready"] = False
            self.robots[i]["retry"] = False
            self.robots[i]["error"] = ""

        for i in self.color_sensors:
            self.color_sensors[i]["response"] = "--"

        self.QR = "--"
        self.datetime = None
        self.local_data["lbl_info1_text"]   = ""
        self.local_data["lbl_info2_text"]   = ""
        self.local_data["lbl_info3_text"]   = ""
        self.local_data["lbl_info4_text"]   = ""
        self.local_data["qr_rework"]        = False

        self.popQueueIzq = False
        self.popQueueDer = False
        self.popQueueIzq_2 = False
        self.popQueueDer_2 = False
        self.databaseTempModel.clear()

        self.codes = {
            "FET": "--",
            "HM": "--",
            "REF": "--"
            }

        self.database["orden"].clear()
        self.database["clamps"].clear()
        self.fusesInit()

        self.gui["request"]     = ""
        self.gui["ID"]          = ""
        self.gui["code"]        = ""
        self.gui["visible"].clear()

        self.plc["emergency"]   = True
        self.plc["retry_btn"]   = False
        self.plc["clamps"].clear()
        self.plc["error"] = ""

    def drawBB (self, draw = [["box", "fuse"]], color = (255,255,255), thickness = 2):
        #red     = (255, 0, 0)
        #orange  = (31, 186, 226)
        #green   = (0, 255, 0)
        #White   = (255, 255, 255)
        BB = self.fuses_BB

        try:
            if type(draw[0]) == list:
                for i in draw:
                    pts = BB[i[0]][i[1]]
                    rectangle(self.imgs[i[0]], pts[0], pts[1], color, thickness)
            else:
                pts = BB[draw[0]][draw[1]]
                rectangle(self.imgs[draw[0]], pts[0], pts[1], color, thickness)
        except Exception as ex:
            print("Model.drawBB exception: ", ex)

    #si no lleva self no es método, es función
    #un método puede usar las variables de la clase (para este caso la clase es model)
    #para eso sirve este self
    def log(self, state):
        try:
            self.last_log = state #método de la clase model, que se iguala a state
            #se hace un diccionario utilizando el argumento de entrada state
            data = {
                "HM":self.codes["HM"],
                "ESTADO": state,
                "FECHA": datetime.now().isoformat()
                }
            #guardar en la base de datos un evento que sucedio (por ejemplo un "STOP" )
            #historial de eventos dentro del software
            resp = requests.post(f"http://{self.server}/api/post/log",data=json.dumps(data))
        except Exception as ex:
            print("Log request Exception: ", ex)