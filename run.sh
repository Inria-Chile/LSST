#!/bin/sh

# export HOST=localhost
cd /home/docker/lsst/LSST-server && python server.py &
cd /home/docker/lsst/LSST-server/scripts && python schedulerTest.py &
cd /home/docker/lsst/LSST-app && npm run start-client
# npm start
