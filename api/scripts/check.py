# pylint: disable=W0611

import os
from time import sleep
from flask import Flask
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy.exc import OperationalError

from repository.checks import check_from_model
from repository.database import clean
from utils.setup import setup
from utils.db import db


SLEEP_TIME = 1

FLASK_APP = Flask(__name__)


setup(FLASK_APP)


class CheckHealth(db.Model, ApiHandler):
    pass


IS_DATABASE_CONNECT_OK = False
while not IS_DATABASE_CONNECT_OK:
    try:
        CheckHealth.__table__.drop(db.session.bind, checkfirst=True)
        CheckHealth.__table__.create(db.session.bind)
        db.session.commit()
    except OperationalError:
        print('Could not connect to postgres db... Retry in {}s...'.format(SLEEP_TIME))
        sleep(SLEEP_TIME)
        continue
    print('Connection to postgres db is okay.')
    IS_DATABASE_CONNECT_OK = True

IS_DATABASE_HEALTH_OK = False
while not IS_DATABASE_HEALTH_OK:
    IS_DATABASE_HEALTH_OK = check_from_model(CheckHealth)[0]
    db.session.execute('DROP TABLE check_health;')
    db.session.commit()
    if not IS_DATABASE_HEALTH_OK:
        print('Could not check database health... Retry in {}s...'.format(SLEEP_TIME))
    else:
        print('Database health is ok.')
