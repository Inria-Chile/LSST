import sys
import time
import datetime
import random

from SALPY_dome import *
from flask_socketio import send, emit
from flask_socketio import SocketIO

#Get data from ts_sal connection
def start_listening_dome_shutter(app, socketio):
    print("SAL starting")
    salDome = SAL_dome()
    salDome.setDebugLevel(0)

    topicOpenShutter = dome_command_OpenShutterC()
    topicCloseShutter = dome_command_CloseShutterC()

    salDome.salProcessor("dome_command_OpenShutter")
    salDome.salProcessor("dome_command_CloseShutter")

    print("SAL listening")
    try:
        with app.test_request_context('/'):
            while True:
                time.sleep(0.3)
                scodeCloseDome = salDome.acceptCommand_CloseShutter(topicCloseShutter)
                scodeOpenDome = salDome.acceptCommand_OpenShutter(topicOpenShutter)
                if scodeCloseDome > 0:
                    publish(app, socketio, False)
                elif scodeOpenDome > 0:
                    publish(app, socketio, True)

    except KeyboardInterrupt:
        print("SAL shutdown")
        salDome.salShutdown()
        sys.exit(0)
    
# Publish data to WS connection
def publish(app, socketio, shutter):
    print('Emitting shutter', shutter)
    if(shutter):
        socketio.emit('DomeShutter', {'Shutter': 1}, namespace='/domeshutter')#Open
    else:
        socketio.emit('DomeShutter', {'Shutter': 0}, namespace='/domeshutter')#Close
