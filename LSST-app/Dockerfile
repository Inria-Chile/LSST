FROM centos:7

LABEL authors="Andres Anania <aanania@lsst.org>, Sebastian Pereira <sebastian.pereira@inria.cl>"

# install required software
RUN yum -y --enablerepo=extras install epel-release && \
  yum -y install unzip \
  git \
  xterm \
  xorg-x11-fonts-misc \
  nodejs && \
  yum clean all
  
ADD package.json /home/docker/lsst/LSST-app/package.json

WORKDIR /home/docker/lsst/LSST-app

RUN npm install

COPY . /home/docker/lsst/LSST-app

RUN npm install

# entrypoint
RUN chmod +x run.sh
ENTRYPOINT /home/docker/lsst/LSST-app/run.sh
