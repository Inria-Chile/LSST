FROM centos

MAINTAINER Sebastián Pereira <sebastian.pereira@inria.cl>

RUN yum -y install unzip wget git tk tk-devel swig ncurses-libs xterm xorg-x11-fonts-misc java-1.8.0-openjdk-devel boost-python boost-python-devel maven python-devel

WORKDIR /home/root/workspace

RUN git clone https://github.com/lsst-ts/ts_sal.git

ENV HOME=/home/root
ENV LSST_SDK_INSTALL=$HOME/workspace/ts_sal
ENV SAL_HOME=$LSST_SDK_INSTALL/lsstsal
ENV SAL_WORK_DIR=$LSST_SDK_INSTALL/test
ENV SAL_CPPFLAGS=-m64
ENV JAVA_HOME=/etc/alternatives/java_sdk_openjdk
ENV LD_LIBRARY_PATH=${SAL_HOME}/lib
ENV TCL_LIBRARY=${SAL_HOME}/lib/tcl8.5
ENV TK_LIBRARY=${SAL_HOME}/lib/tk8.5
ENV LD_PRELOAD=/etc/alternatives/java_sdk_openjdk/jre/lib/amd64/libjsig.so
ENV PATH=$JAVA_HOME/bin:${M2}:${SAL_HOME}/bin:${PATH}
ENV PYTHONPATH=$PYTHONPATH:${SAL_WORK_DIR}/lib
ENV SAL_DIR=${SAL_HOME}/scripts
ENV PATH=${PATH}:${SAL_DIR}
WORKDIR /home/root/workspace/ts_sal/test

RUN wget -nv ftp://ftp.noao.edu/pub/dmills/opensplice_latest.tgz
RUN tar xzf opensplice_latest.tgz

RUN wget -nv https://github.com/lsst-ts/ts_xml/archive/master.zip -O master.zip
RUN unzip -o master.zip
RUN mv -v ts_xml-master/sal_interfaces/*/*.xml .

ENV OSPL_HOME=$LSST_SDK_INSTALL/OpenSpliceDDS/V6.4.1/HDE/x86_64.linux

RUN mv /home/root/workspace/ts_sal/test/OpenSpliceDDS $LSST_SDK_INSTALL/

RUN yum groupinstall -y "Development Tools" "Development Libraries"

RUN yum -y --enablerepo=extras install epel-release

RUN yum -y install python-pip python-wheel

RUN rpm -ivh https://kojipkgs.fedoraproject.org//packages/http-parser/2.7.1/3.el7/x86_64/http-parser-2.7.1-3.el7.x86_64.rpm && yum -y install nodejs

COPY ts_sal.sh /home/docker/lsst/ts_sal.sh
COPY Makefile.sacpp_SAL_python.template /home/docker/lsst/Makefile.sacpp_SAL_python.template
COPY LSST-server/requirements.txt /home/docker/lsst/LSST-server/requirements.txt

RUN cp /home/docker/lsst/Makefile.sacpp_SAL_python.template /home/root/workspace/ts_sal/lsstsal/scripts/code/templates/Makefile.sacpp_SAL_python.template

RUN chmod +x /home/docker/lsst/ts_sal.sh

RUN /home/docker/lsst/ts_sal.sh

RUN cp */cpp/src/*.so /home/root/workspace/ts_sal/test/lib

RUN pip install -r /home/docker/lsst/LSST-server/requirements.txt

COPY . /home/docker/lsst

RUN npm install ~/../docker/lsst/LSST-app

WORKDIR /home/docker/lsst/LSST-app

RUN chmod +x run.sh

ENTRYPOINT source /home/root/workspace/ts_sal/setup.env && ./run.sh