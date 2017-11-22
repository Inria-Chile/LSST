# LSST dummy backend server
## Instructions:
- Setup virtualenv
- pip install -r requirements.txt
- Place circumpolar.dat in root directory
- python server.py

## Docker build:
 - xhost +local:root
 - docker build -t lsst-server .
 - docker run -it -p 5000:5000 -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix --net=host --name lsst-server lsst-server
 