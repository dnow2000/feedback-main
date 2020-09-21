FROM python:3.7

ENV PYTHONUNBUFFERED 1
WORKDIR /opt/api

COPY ./requirements.txt /opt/api/requirements.txt
RUN pip install -r /opt/api/requirements.txt
RUN mkdir -p /opt/api/tmp/jobs && echo "this is a folder storing all the most recent jobs" >> /opt/api/tmp/jobs/info

COPY ./utils/nltk_downloader.py /opt/api/utils/nltk_downloader.py
RUN PYTHONPATH=/opt/api python -c "import utils.nltk_downloader"

EXPOSE 5000
