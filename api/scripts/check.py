# pylint: disable=W0611

import os
from flask import Flask
from sqlalchemy_api_handler import ApiHandler
from time import sleep
from sqlalchemy.exc import OperationalError

from models import import_models
from repository.health import check_database_health
from utils.setup import setup
from utils.db import db


SLEEP_TIME = 1

FLASK_APP = Flask(__name__)

setup(FLASK_APP)

is_database_health_ok = False
while is_database_health_ok == False:
    try:
        db.init_app(FLASK_APP)
        ApiHandler.set_db(db)

        FLASK_APP.app_context().push()
        import models.user
        db.create_all()
        db.session.commit()
    except OperationalError:
        print('Could not connect to postgres db... Retry in {}s...'.format(SLEEP_TIME))
        sleep(SLEEP_TIME)
        continue
    print('Connection to postgres db is okay.')
    sleep(SLEEP_TIME)
    is_database_health_ok = check_database_health()[0]
    if not is_database_health_ok:
        print('Could not check database health... Retry in {}s...'.format(SLEEP_TIME))
    else:
        print('Database health is ok.')
