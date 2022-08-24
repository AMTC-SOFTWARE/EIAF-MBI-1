# -*- coding: utf-8 -*-
"""
Created on Wed May 13 9:27:34 2020

@author: MSc. Marco Rutiaga Quezada

"""

import paho.mqtt.client as mqtt
import json, shutil
from time import sleep

def on_connect(client, userdata, flags, rc):
    print("Connected with result code {}".format(rc))
    client.subscribe("#")
    
def on_message(client, userdata, message):
    payload = json.loads(message.payload)
    print ("    ", message.topic, payload)
    
def setup (host = "127.0.0.1", port = "1883"):
    global client
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(host)
    client.loop_start()
    
def stop ():
    global client
    sleep(0.5)
    client.loop_stop()
    client.disconnect()
    print("Good bye...")
    
if __name__ == "__main__":    
    setup()

    #input("\n\tPress any key to start\n")
    #client.publish("PLC/1/status", '{"start": true}', qos = 2)
    #sleep(0.5)
    #client.publish("PLC/1/status", '{"clamp_PDC-P": true}', qos = 2)
    #client.publish("PLC/1/status", '{"clamp_PDC-RMID": true}', qos = 2)
    #client.publish("PLC/1/status", '{"clamp_PDC-D": true}', qos = 2)
    #client.publish("PLC/1/status", '{"clamp_TBLU": true}', qos = 2)
    #
    #input("\n\tPress any key to start\n")
    #client.publish("PLC/1/status", '{"key": true}', qos = 2)
    #
    #input("\n\tPress any key to start\n")
    #client.publish("RobotEpson/3/status", '{"response": "READY"}', qos = 2)
    #sleep(0.5)
    #client.publish("RobotEpson/4/status", '{"response": "READY"}', qos = 2)
    while True:
        tecla = input("\n\tPress any key to continue\n")
        if tecla == "a":
            client.publish("RobotEpson/3/status", '{"response": "LOADED"}', qos = 2)
            input("\n\tPress any key to continue\n")
            client.publish("RobotEpson/3/status", '{"response": "INSERTED"}', qos = 2)
        if tecla == "b":
            client.publish("RobotEpson/4/status", '{"response": "LOADED"}', qos = 2)
            input("\n\tPress any key to continue\n")
            client.publish("RobotEpson/4/status", '{"response": "INSERTED"}', qos = 2)

    sleep(1)
    stop()


    
    
