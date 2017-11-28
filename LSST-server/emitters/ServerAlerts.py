# import sys
import time
# import datetime
import random

# from SALPY_scheduler import *
from flask_socketio import send, emit
from flask_socketio import SocketIO

numberOfRacks =  15
slotsInRacks = [2,5,4,1,3,9,2,0,1,11,1,0,3,5,13,9]

def start_listening_fake_alerts(app, socketio):
    print('Emitting fake server alerts')
    initial_date = 10000
    date_step = 1000
    while True:
        time.sleep(30)
        with app.test_request_context('/'):
            # print('Emitting')
            isItWorking = random.random()
            # isItWorking=1
            rack = random.randint(0,numberOfRacks)
            if slotsInRacks[rack] > 0:
                slot = random.randint(1,slotsInRacks[rack])
                socketio.emit('server_alerts', {'isItWorking': isItWorking, 'rack':rack, 'slot':slot})
                initial_date = initial_date + date_step