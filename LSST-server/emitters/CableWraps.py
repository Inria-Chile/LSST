import sys
import time
import datetime
import random

from flask_socketio import send, emit
from flask_socketio import SocketIO

def start_listening_fake_cable_wraps(app, socketio):

    print('Emitting fake cable wraps')
    initial_date = 10000
    date_step = 1000
    az_cable_position = 0
    az_rotator_position = 0
    cam_cable_position = 0
    cam_rotator_position = 0
    socketio.emit('cable_wraps', {'cam_cable': cam_cable_position, 'cam_rot': cam_rotator_position, 'az_cable': az_cable_position, 'az_rot': az_rotator_position})
         
    while True:
        time.sleep(1)
        with app.test_request_context('/'):
            
            az_cable_wrap = random.uniform(-5,5)
            az_cable_position = az_cable_position+az_cable_wrap
            az_rot_wrap = random.uniform(-2,2)+az_cable_wrap
            az_rotator_position = az_rotator_position+az_rot_wrap

            cam_cable_wrap = random.uniform(-5,5)
            cam_cable_position = cam_cable_position+cam_cable_wrap
            cam_rot_wrap = random.uniform(-2,2)+cam_cable_wrap
            cam_rotator_position = cam_rotator_position+cam_rot_wrap
            
            socketio.emit('cable_wraps', {'cam_cable': cam_cable_position, 'cam_rot': cam_rotator_position, 'az_cable': az_cable_position, 'az_rot': az_rotator_position})
            initial_date = initial_date + date_step
