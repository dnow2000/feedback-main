FROM python:3.7

ARG USER
ENV PYTHONUNBUFFERED 1
WORKDIR /opt/api

COPY ./requirements.txt /opt/api/requirements.txt
COPY ./requirements-dev.txt /opt/api/requirements-dev.txt
RUN pip install -r /opt/api/requirements.txt -r /opt/api/requirements-dev.txt

COPY ./nltk.txt /opt/api/nltk.txt
COPY ./utils/nltk.py /opt/api/utils/nltk.py
RUN PYTHONPATH=/opt/api python -c "from utils.nltk import import_nltk; import_nltk();"

RUN if [ -n "$IS_WORKER" ]; then sudo chown -R celery:celery static; fi
#USER root
#RUN mkdir -p /tmp/.newspaper_scraper/article_resources
#RUN 

EXPOSE 5000
