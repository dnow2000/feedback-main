# pylint: disable=W0611

import os
from time import sleep
from flask import Flask
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy.exc import OperationalError

from utils.setup import setup
from utils.db import db


SLEEP_TIME = 1

FLASK_APP = Flask(__name__)

setup(FLASK_APP)


IS_DATABASE_HEALTH_OK = False
while not IS_DATABASE_HEALTH_OK:
    try:
        #FLASK_APP.app_context().push()
        db.create_all()
        db.session.commit()
    except OperationalError as e:
        print(e)
        print('Could not connect to postgres db... Retry in {}s...'.format(SLEEP_TIME))
        sleep(SLEEP_TIME)
        continue
    print('Connection to postgres db is okay.')
    sleep(SLEEP_TIME)
    from repository.health import check_database_health
    IS_DATABASE_HEALTH_OK = check_database_health()[0]
    if not IS_DATABASE_HEALTH_OK:
        print('Could not check database health... Retry in {}s...'.format(SLEEP_TIME))
    else:
        print('Database health is ok.')
