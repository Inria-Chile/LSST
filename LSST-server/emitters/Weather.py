import sys
import time
import datetime
import random
import numpy
import math

from flask_socketio import send, emit
from flask_socketio import SocketIO

def start_listening_fake_weather(app, socketio):
    print('Emitting fake weather')
    ambient_temp = 30.0
    humidity = 15.0
    pressure = 750.0
         
    while True:
        time.sleep(1)
        with app.test_request_context('/'):
            ambient_temp = max(-10, min(40, ambient_temp + (random.uniform(-0.5, 0.5))))
            humidity = max(0, min(100, humidity + (random.uniform(-0.5, 0.5))))
            pressure = max(600, min(800, pressure + (random.uniform(-0.5, 0.5))))
            socketio.emit('Weather', {'ambient_temp': ambient_temp, 'humidity':humidity, 'pressure':pressure}, namespace='/weather')

#Get data from ts_sal connection
def start_listening_weather(app, socketio):
    from SALPY_environment import SAL_environment
    print("SAL_environment starting")
    mgr = SAL_environment()
    mgr.salTelemetrySub("environment_weather")
    weatherData = environment_weatherC()
    print("environment_weather subscriber ready")
    print("SAL_environment listening")
    try:
        with app.test_request_context('/'):
            while True:
                time.sleep(1)
                retval = mgr.getSample_weather(weatherData)
                if retval==0:
                    publish(app, socketio, weatherData)

    except KeyboardInterrupt:
        print("SAL shutdown")
        mgr.salShutdown()
        sys.exit(0)
    
# Publish data to WS connection
def publish(app, socketio, weatherData):
    print('EmittingWeather', {'ambient_temp': weatherData.ambient_temp, 'humidity':weatherData.humidity, 'pressure':weatherData.pressure})
    socketio.emit('Weather', {'ambient_temp': weatherData.ambient_temp, 'humidity':weatherData.humidity, 'pressure':weatherData.pressure}, namespace='/weather')
