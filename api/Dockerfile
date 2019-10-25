FROM python:3.8

ENV PYTHONUNBUFFERED 1
WORKDIR /opt/api

COPY ./requirements.txt ./
RUN pip install -r ./requirements.txt
RUN python -m nltk.downloader punkt stopwords

EXPOSE 5000
