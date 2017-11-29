#!/bin/sh

# export HOST=localhost
cd /home/docker/workspace/ts_visit_simulator/test/tcs/tcs/bin
./startdemo &
cd /home/docker/lsst/LSST-server && python3 server.py production
# npm start
