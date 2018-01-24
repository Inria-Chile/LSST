# LSST
Large Synoptic Survey Telescope control interface

### To run in Docker:
* docker build -t lsst-img .
* docker run -p 3000:3000 -d --name lsst lsst-img
* Go to http://localhost:3000

### Run without Docker:
- virtualenv -p python3 virtualenv
- source virtualenv/bin/activate
- sudo apt-get install libmysqlclient-dev
- pip3 install -r LSST-server/requirements.txt
- wget -O LSST-server/circumpolar.db http://artifactory.inria.cl:8081/artifactory/generic-local/circumpolar.db
- cd LSST-app
- npm install -g npm@5.2.0
- npm install
- npm start
