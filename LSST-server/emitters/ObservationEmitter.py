import sys
import time
import datetime
import random

from SALPY_scheduler import *
from flask_socketio import send, emit
from flask_socketio import SocketIO

filters =  ['u','g','r','i','z','y']

def start_listening_fake(app, socketio):
    print('Emitting fake telemetry')
    while True:
        time.sleep(0.510)
        with app.test_request_context('/'):
            # print('Emitting')
            socketio.emit('data', {'fieldID': random.randint(1,100), 'fieldRA':random.randint(-40,40), 'fieldDec':random.randint(-60,0), 'filterName':filters[random.randrange(len(filters))], 'count':1})

#Get data from ts_sal connection
def start_listening(app, socketio):
    print("SAL starting")
    sal = SAL_scheduler()
    sal.setDebugLevel(0)

    topicTime           = scheduler_timeHandlerC()
    topicObservation    = scheduler_observationC()
    topicTarget         = scheduler_targetC()

    sal.salTelemetrySub("scheduler_timeHandler")
    sal.salTelemetrySub("scheduler_observation")
    sal.salTelemetryPub("scheduler_target")

    measInterval = 1

    measCount  = 0
    visitCount = 0
    syncCount  = 0
    targetId   = 0

    stime = time.time()
    print("SAL listening")
    try:
        while True:
            time.sleep(1.510)
            scode = sal.getNextSample_timeHandler(topicTime)
            if scode == 0 and topicTime.timestamp != 0:

                targetId += 1

                topicTarget.targetId = targetId
                topicTarget.fieldId  = random.randint(1,100)
                topicTarget.filter   = filters[random.randrange(len(filters))]
                topicTarget.ra       = random.randint(-40,40)
                topicTarget.dec      = random.randint(-60,0)
                sal.putSample_target(topicTarget)

                while True:
                    scode = sal.getNextSample_observation(topicObservation)
                    if scode == 0 and topicObservation.targetId != 0:
                        publish(app, socketio, topicObservation)
                        measCount += 1
                        visitCount += 1
                        if topicTarget.targetId == topicObservation.targetId:
                            syncCount += 1
                            break
                        else:
                            print("UNSYNC targetId=%i observationId=%i" % (topicTarget.targetId, topicObservation.targetId))

    except KeyboardInterrupt:
        sal.salShutdown()
        sys.exit(0)
    
# Publish data to WS connection
def publish(app, socketio, topicObservation):
    print('Emitting', [topicObservation.filter, topicObservation.ra, topicObservation.dec, 1])
    with app.test_request_context('/'):
        socketio.emit('data', {'fieldID': topicObservation.targetId, 'fieldRA':topicObservation.ra, 'fieldDec':topicObservation.dec, 'filterName':topicObservation.filter, 'count':1})