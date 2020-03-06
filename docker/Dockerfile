################################################################################

FROM ubuntu:16.04
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get -y update

################################################################################
# Install utilities

RUN apt-get -y install wget
RUN apt-get -y install emacs-nox vim
RUN apt-get -y install python python3 python3-pip python-pip
RUN apt-get -y install aptitude
RUN apt-get -y install pkg-config
RUN apt-get -y install libcairo2-dev
RUN apt-get -y install libjpeg8-dev
RUN apt-get -y install libgif-dev libyaml-dev
RUN apt-get -y install git
RUN apt-get -y install openjdk-8-jre
RUN apt-get -y install libopenblas-dev libomp-dev

################################################################################
# Install mongodb

RUN apt-get -y install mongodb-clients mongodb-server

################################################################################
# Install node environment

RUN apt-get -y install nodejs
RUN apt-get -y install npm
RUN npm install --global node-gyp bower
#RUN rm -f /usr/bin/node
#RUN ln /usr/bin/nodejs /usr/bin/node

RUN apt-get -y install curl
RUN curl --silent --location https://deb.nodesource.com/setup_5.x | bash -
RUN apt-get -y install nodejs
RUN rm -f /usr/bin/node
RUN ln /usr/bin/nodejs /usr/bin/node

RUN pip3 install --upgrade pip
RUN pip3 install 'watchdog==0.9.0' wheel tqdm implicit h5py flask flask_restful flask_jsonpify sqlalchemy
RUN pip3 install faiss nmslib annoy

################################################################################
# Main command

CMD cd; make start-all

################################################################################
