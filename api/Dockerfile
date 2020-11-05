FROM python:3.7

ENV PYTHONUNBUFFERED 1
WORKDIR /opt/api

COPY ./requirements.txt /opt/api/requirements.txt
COPY ./requirements-dev.txt /opt/api/requirements-dev.txt
RUN pip install -r /opt/api/requirements.txt -r /opt/api/requirements-dev.txt

COPY ./nltk.txt /opt/api/nltk.txt
COPY ./utils/nltk.py /opt/api/utils/nltk.py
RUN PYTHONPATH=/opt/api python -c "from utils.nltk import import_nltk; import_nltk();"

EXPOSE 5000
