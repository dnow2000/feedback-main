import os
from flask import Flask
from sqlalchemy_api_handler import ApiHandler
from time import sleep
from sqlalchemy.exc import OperationalError

from models.utils.db import db
from utils.health import check_database_health

SLEEP_TIME = 1

flask_app = Flask(__name__)
flask_app.secret_key = os.environ.get('FLASK_SECRET', '1%BCy22xV8c8+=dd')
flask_app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URL')
flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

is_database_health_ok = False
while is_database_health_ok == False:
    try:
        db.init_app(flask_app)
        ApiHandler.set_db(db)

        flask_app.app_context().push()
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
