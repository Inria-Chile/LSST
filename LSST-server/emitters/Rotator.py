import sys
import time
import datetime
import random

from SALPY_rotator import *
from flask_socketio import send, emit
from flask_socketio import SocketIO

#Get data from ts_sal connection
def start_listening_rotator(app, socketio):
    print("SAL starting")
    salRotator = SAL_rotator()
    salRotator.setDebugLevel(0)

    topicRotatorPosition = rotator_PositionC()

    salRotator.salTelemetrySub("rotator_Position")

    print("SAL listening")
    try:
        while True:
            time.sleep(0.3)
            scodeRotator = salRotator.getNextSample_Position(topicRotatorPosition)
            if scodeRotator == 0:
                publish(app, socketio, topicRotatorPosition)

    except KeyboardInterrupt:
        print("SAL shutdown")
        salRotator.salShutdown()
        sys.exit(0)
    
# Publish data to WS connection
def publish(app, socketio, topicRotatorPosition):
    # print('Emitting', [topicRotatorPosition.Calibrated[0]])
    with app.test_request_context('/'):
        socketio.emit('Rotator', {'RotatorPosition': topicRotatorPosition.Calibrated[0]}, namespace='/rotator')