import sys
import time
import datetime
import random
import numpy


from flask_socketio import send, emit
from flask_socketio import SocketIO

numberOfRacks =  15
slotsInRacks = [2,5,4,1,3,9,2,0,1,11,1,0,3,5,13,9]


def start_listening_fake_alerts(app, socketio):

    server_ids = ["Patch Panel 1","DWDM",
    "Spine 201","Patch Panel 2","Spine 202","Patch Panel 3", "APICS", 
    "Firewall","Router","WLAN","voip",
    "Patch Panels",
    "Leaf 101", "Leaf 102", "MMCS", 
    "IPMI", "AUX Calibration", "AUX Scheduler","AUX Spectograph","AUX Mount/Dome", "AUX DAO Manage","AUX Diagnostic","AUX Bridgs","Sw to AUX",
    "DQ1","DQ2",
    "Camera Electronics",
    "Leaf 103","Leaf 104","IPMI","Camera DB", "Master Control", "Lock Manager","Raft HCU","CCS-OCS Bridge","Image Store", "DAQ Manager","Visualization Server",
    "Diagnostic Cluster", 
    "Leaf 105 Sum/13-2", "Leaf 106 Sum/13-4", "IPMI",
    "Visualization 1", "Visualization 2","Visualization 3","Visualization 4","Visualization 5",
    "TCS M1/M3","ECS Basbon","Guider Image Pro","Calibration","TCS Tel Align","TCS ECS","M2 Warns","Rot/Hex Moog","TCS Optics","Dome E/E","Mount EA","TCS Kernel","TCS Application",
    "Leaf 107","Leaf 108","IPMI","OCS Maint","OCS Scheduler","OCS Telemetry 1", "OCS Telemetry 2", "OCS Application","TCS Wavefront Sensing"]

    print('Emitting fake server alerts')
    initial_date = 10000
    date_step = 1000
    while True:
        time.sleep(2)
        with app.test_request_context('/'):
            server_id = server_ids[random.randint(0, len(server_ids)-1)]
            cpu = random.random()
            disk = random.random()
            s1v = random.uniform(0.8,1.2)
            s3v = random.uniform(2.3,3.4)
            s5v = random.uniform(4.3,5.1)
            s12v = random.uniform(11.3,12.1)
            temperature = random.uniform(25,100)
            socketio.emit('server_alerts', {'server_id': server_id, 'server_CPU': cpu, 'server_disk': disk, 'server_power_supply1_1V': s1v,'server_power_supply3_3V': s3v,'server_power_supply5V': s5v,'server_power_supply12V': s12v,'server_temperature': temperature })
            initial_date = initial_date + date_step

#Get data from ts_sal connection
def start_listening_servers(app, socketio):
    from SALPY_summitFacility import SAL_summitFacility, summitFacility_ServerStatusC
    print("SAL starting")
    salServers = SAL_summitFacility()
    salServers.setDebugLevel(0)

    topicServers = summitFacility_ServerStatusC()

    salServers.salTelemetrySub("summitFacility_ServerStatus")

    print("SAL listening server alerts")
    try: 
        with app.test_request_context('/'):
            while True:
                time.sleep(1)
                scodeServers = salServers.getSample_ServerStatus(topicServers)
                if scodeServers == 0:
                    publish(app, socketio, topicServers)

    except KeyboardInterrupt:
        print("SAL shutdown")
        salServers.salShutdown()
        sys.exit(0)
    
# Publish data to WS connection
def publish(app, socketio, topicServers):
    # print('EmittingServer', {'server_id': topicServers.Id, 'server_CPU': topicServers.CPU, 'server_disk': topicServers.disk, 'server_power_supply1_1V': topicServers.power_supply1_1V,'server_power_supply3_3V': topicServers.power_supply3_3V,'server_power_supply5V': topicServers.power_supply5V,'server_power_supply12V': topicServers.power_supply12V,'server_temperature': topicServers.temperature })
    socketio.emit('server_alerts', {'server_id': topicServers.Id, 'server_CPU': topicServers.CPU, 'server_disk': topicServers.disk, 'server_power_supply1_1V': topicServers.power_supply1_1V,'server_power_supply3_3V': topicServers.power_supply3_3V,'server_power_supply5V': topicServers.power_supply5V,'server_power_supply12V': topicServers.power_supply12V,'server_temperature': topicServers.temperature })
                