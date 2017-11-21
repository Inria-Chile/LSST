import sys
import time
import datetime
import random

from SALPY_domeLouvers import *
from flask_socketio import send, emit
from flask_socketio import SocketIO

#Get data from ts_sal connection
def start_listening_louvers(app, socketio):
    print("SAL starting")
    salLouvers = SAL_domeLouvers()
    salLouvers.setDebugLevel(0)

    topicLouvers = domeLouvers_statusC()

    salLouvers.salTelemetrySub("domeLouvers_status")

    print("SAL listening")
    try:
        while True:
            time.sleep(0.3)
            scodeLouvers = salLouvers.getNextSample_status(topicLouvers)
            if scodeLouvers == 0:
                publish(app, socketio, topicLouvers)

    except KeyboardInterrupt:
	print("SAL shutdown")
        salLouvers.salShutdown()
        sys.exit(0)
    
# Publish data to WS connection
def publish(app, socketio, topicLouvers):
    print('Emitting', [topicLouvers.position_actual, topicLouvers.position_error, topicLouvers.position_cmd])
    with app.test_request_context('/'):
	    for i in range(0,34):
        	louverPos = 'topicLouvers'+str(i)
        	LouversPosErr = 'LouversPosErr'+str(i)
        	LouversCMD = 'LouversCMD'+str(i)
        	socketio.emit('Louvers', {louverPos: topicLouvers.position_actual[i], LouversPosErr:topicLouvers.position_error[i], LouversCMD:topicLouvers.position_cmd[i]})
