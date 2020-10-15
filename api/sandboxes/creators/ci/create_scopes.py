from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.utils import logger

from models.scope import Scope, ScopeType
from models.tag import Tag

def create_scopes():
    logger.info('create_scopes')

    scopes = []

    ApiHandler.save(*scopes)

    logger.info('created {} scopes'.format(len(scopes)))
