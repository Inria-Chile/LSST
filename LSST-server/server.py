from flask import Flask, url_for, request
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Float, Date, String, VARCHAR
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, class_mapper
from json import dumps
from utils import serialize
import pandas as pd
import sys

from routes import app
from flask import Flask
from flask_socketio import SocketIO
from flask_socketio import send, emit
import eventlet
eventlet.monkey_patch()

app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode='eventlet')

@app.route('/')
def api_root():
    return '''
<head>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/socket.io/1.3.6/socket.io.min.js"></script>
<script>
    var socket = io();
</script>
</head>
<body>Welcome</body>'''

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == 'production':
        print('Spawning eventlet production')
        from emitters.ObservationEmitter import start_listening_survey
        from emitters.Rotator import start_listening_rotator
        from emitters.Louvers import start_listening_louvers
        from emitters.DomeShutter import start_listening_dome_shutter
        from emitters.DomePosition import start_listening_dome_position
        from emitters.ServerAlerts import start_listening_servers
        from emitters.Weather import start_listening_weather
        eventlet.spawn(start_listening_louvers, app, socketio)
        # eventlet.spawn(start_listening_rotator, app, socketio)
        eventlet.spawn(start_listening_survey, app, socketio)
        eventlet.spawn(start_listening_dome_shutter, app, socketio)
        eventlet.spawn(start_listening_dome_position, app, socketio)
        eventlet.spawn(start_listening_servers, app, socketio)
        eventlet.spawn(start_listening_weather, app, socketio)
    else:
        from emitters.ObservationEmitter import start_listening_fake
        from emitters.ServerAlerts import start_listening_fake_alerts
        from emitters.ServerAlerts import start_listening_servers
        print('Spawning eventlet')
        eventlet.spawn(start_listening_fake, app, socketio)
        eventlet.spawn(start_listening_fake_alerts,app,socketio)
    socketio.run(app, host='0.0.0.0')
    send('message')