#!/bin/sh

# export HOST=localhost
cd ../LSST-server && python server.py &
cd ../LSST-server/scripts && python schedulerTest.py &
npm run start-client
# npm start