import sys
import time
import datetime
import random

from SALPY_domeADB import *
from SALPY_domeLWS import *
from flask_socketio import send, emit
from flask_socketio import SocketIO

#Get data from ts_sal connection
def start_listening_dome_position(app, socketio):
    print("SAL starting")
    salAz = SAL_domeADB()
    salAz.setDebugLevel(0)

    salEl = SAL_domeLWS()
    salEl.setDebugLevel(0)

    topicDomeAz = domeADB_statusC()
    topicDomeEl = domeLWS_statusC()

    salAz.salTelemetrySub("domeADB_status")
    salEl.salTelemetrySub("domeLWS_status")

    print("SAL listening")
    try:
        while True:
            time.sleep(0.3)
            scodeAz = salAz.getSample_status(topicDomeAz)
            scodeEl = salEl.getSample_status(topicDomeEl)
            if scodeAz == 0 and scodeEl == 0:
                publish(app, socketio, topicDomeAz, topicDomeEl)

    except KeyboardInterrupt:
        print("SAL shutdown")
        salAz.salShutdown()
        salEl.salShutdown()
        sys.exit(0)
    
# Publish data to WS connection
def publish(app, socketio, topicDomeAz, topicDomeEl):
    print('Emitting DomePosition', [topicDomeAz.position_actual, topicDomeAz.position_error, topicDomeAz.position_cmd, topicDomeEl.position_actual, topicDomeEl.position_error, topicDomeEl.position_cmd])
    with app.test_request_context('/'):
        socketio.emit('DomePosition', {'DomeAzPos': topicDomeAz.position_actual, 'DomeAzPosErr':topicDomeAz.position_error, 'DomeAzCMD':topicDomeAz.position_cmd, 'DomeElPos': topicDomeEl.position_actual, 'DomeElPosErr':topicDomeEl.position_error, 'DomeElCMD':topicDomeEl.position_cmd}, namespace='/domeposition')
