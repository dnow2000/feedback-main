FROM circleci/classic:latest

RUN pip install --upgrade pip
RUN python -m virtualenv venv
RUN . venv/bin/activate
RUN pip install docker-compose

RUN apt-get update
RUN apt-get install -y realpath
