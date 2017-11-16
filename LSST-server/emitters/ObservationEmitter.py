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
    initial_date = 10000
    date_step = 1000
    while True:
        time.sleep(0.5)
        with app.test_request_context('/'):
            # print('Emitting')
            ra = random.randint(-40,40)
            dec = random.randint(-60,0)
            id = "live" + str(ra+40+(dec*100*-1))
            socketio.emit('data', {'fieldID': id, 'fieldRA':ra, 'fieldDec':dec, 'filterName':filters[random.randrange(len(filters))], 'count':1, 'request_time': time.time()-757393245-3, 'expTime': 34})
            initial_date = initial_date + date_step

#Get data from ts_sal connection
def start_listening_survey(app, socketio):
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
        initial_date = 10000
        date_step = 1000
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
                topicTarget.request_time = initial_date
                topicTarget.visit_time = 34
                initial_date = initial_date + date_step
                sal.putSample_target(topicTarget)

                while True:
                    scode = sal.getNextSample_observation(topicObservation)
                    if scode == 0 and topicObservation.targetId != 0:
                        topicObservation.observation_start_time = topicTarget.request_time
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
    print('Emitting', [topicObservation.filter, topicObservation.ra, topicObservation.dec, 1, topicObservation.observation_start_time, topicObservation.visit_time])
    with app.test_request_context('/'):
        socketio.emit('data', {'fieldID': topicObservation.targetId, 'fieldRA':topicObservation.ra, 'fieldDec':topicObservation.dec, 'filterName':topicObservation.filter, 'count':1, 'request_time':topicObservation.observation_start_time, 'expTime':topicObservation.visit_time})