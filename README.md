# LSST
Large Synoptic Survey Telescope control interface

### To run:
* Clone ts_visit_simulator into LSST-server
* xhost +local:root
* cd LSST-server && docker build -t lsst-server .
* cd ../LSST-app && docker build -t lsst-app .
* docker run -it -p 5000:5000 -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix --net=host --name lsst-server lsst-server
* docker run -p 3000:3000 -d --name lsst-app lsst-app
* Go to http://localhost:3000