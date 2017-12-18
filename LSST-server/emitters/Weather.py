import sys
import time
import datetime
import random
import numpy
from SALPY_environment import *

from flask_socketio import send, emit
from flask_socketio import SocketIO

#Get data from ts_sal connection
def start_listening_weather(app, socketio):
    print("SAL_environment starting")
    mgr = SAL_environment()
    mgr.salTelemetrySub("environment_weather")
    weatherData = environment_weatherC()
    print("environment_weather subscriber ready")
    print("SAL_environment listening")
    try:
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
    print('')
    print('')
    print('EmittingWeather', {'ambient_temp': weatherData.ambient_temp, 'humidity':weatherData.humidity, 'pressure':weatherData.pressure})
    print('')
    print('')
    with app.test_request_context('/'):
        socketio.emit('Weather', {'ambient_temp': weatherData.ambient_temp, 'humidity':weatherData.humidity, 'pressure':weatherData.pressure}, namespace='/weather')
