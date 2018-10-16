#!/bin/bash
set -x
cd /opt/services/flaskapp/src
pip install -r requirements.txt
python -m nltk.downloader punkt
python scripts/sf.py sandbox --name=init
sleep 10 # This leaves time for Postgres to create the DB
while true; do
    python app.py
    sleep 2
done
