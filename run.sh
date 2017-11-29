#!/bin/sh

# export HOST=localhost
cd /home/docker/lsst/LSST-server && python3 server.py &
cd /home/docker/lsst/LSST-server/scripts && python3 schedulerTest.py &
cd /home/docker/lsst/LSST-app && npm run start-client
# npm start
