# pylint: disable=W0611

import os
from flask import Flask
from sqlalchemy_api_handler import ApiHandler
from time import sleep
from sqlalchemy.exc import OperationalError

from models import import_models
from repository.health import check_database_health
from utils.db import db


SLEEP_TIME = 1

FLASK_APP = Flask(__name__)
FLASK_APP.secret_key = os.environ.get('FLASK_SECRET', '1%BCy22xV8c8+=dd')
FLASK_APP.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URL')
FLASK_APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

FLASK_APP.app_context().push()
import_models()

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
