from sqlalchemy_api_handler.utils import logger

from utils.config import VERSION
from utils.database import db


def check_from_model(model):
    database_working = False
    version = 'Api {} : '.format(VERSION)
    try:
        model.query.limit(1).all()
        database_working = True
        state = 'database with {} model is ok.'.format(model.__name__.lower())
    except Exception as e:
        logger.critical(str(e))
        state = 'database with {} model is not ok.'.format(model.__name__.lower())
    output = '{}{}'.format(version, state)

    return database_working, output
