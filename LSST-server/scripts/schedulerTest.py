import sys
import time
import datetime

from SALPY_scheduler import *

sal = SAL_scheduler()
sal.setDebugLevel(0)

topicTime           = scheduler_timeHandlerC()
topicObservation    = scheduler_observationC()
topicTarget         = scheduler_targetC()

sal.salTelemetryPub("scheduler_timeHandler")
sal.salTelemetryPub("scheduler_observation")
sal.salTelemetrySub("scheduler_target")

start_date = "2010-10-01 16:28:00"
start_seconds = time.mktime(time.strptime(start_date, "%Y-%m-%d %H:%M:%S"))
delta_seconds = 40

topicTime.timestamp = int(start_seconds)

measInterval = 1
stime = time.time()
count = 0
totalcount = 0
observationId = 0
try:
    while True:
        sal.putSample_timeHandler(topicTime)
        time.sleep(3.010)
        while True:
            time.sleep(0.210)
            scode = sal.getNextSample_target(topicTarget)
            if scode == 0 and topicTarget.targetId != 0:
                print([topicTarget.filter, topicTarget.ra, topicTarget.dec])
                observationId += 1
                topicObservation.observationId = observationId
                topicObservation.targetId      = topicTarget.targetId
                topicObservation.filter      = topicTarget.filter
                topicObservation.ra      = topicTarget.ra
                topicObservation.dec      = topicTarget.dec
                topicObservation.visit_time      = 34

                topicTime.timestamp += delta_seconds

                sal.putSample_observation(topicObservation)

                break

        ntime = time.time()
        dtime = ntime - stime
        if dtime >= measInterval:
            rate = float(count)/dtime
            print("tx %.0f msg/sec total=%i messages" % (rate, totalcount))
            stime = ntime
            count = 0
        count += 1
        totalcount += 1

except KeyboardInterrupt:
    sal.salShutdown()
    sys.exit(0)

