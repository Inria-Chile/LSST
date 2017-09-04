from flask import Flask, url_for, request
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Float, Date, String, VARCHAR
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, class_mapper
from json import dumps
from utils import serialize
import pandas as pd

from routes import app
from emitters.ObservationEmitter import start_listening_fake
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
    eventlet.spawn(start_listening_fake, app, socketio)
    socketio.run(app)
    send('message')