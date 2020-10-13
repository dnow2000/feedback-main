FROM python:3.7

ARG MODE
WORKDIR /opt/worker

COPY ./requirements.txt /opt/worker

RUN pip install -r /opt/worker/requirements.txt
