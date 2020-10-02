from sqlalchemy_api_handler import logger

from utils.config import VERSION
from utils.db import db


def check_from_model(model):
    database_working = False
    version = 'Api {} : '.format(VERSION)
    try:
        model.query.limit(1).all()
        database_working = True
        state = 'database is ok.'
    except Exception as e:
        logger.critical(str(e))
        state = 'database is not ok.'
    output = '{}{}'.format(version, state)

    return database_working, output
