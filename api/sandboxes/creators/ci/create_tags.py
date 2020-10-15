from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.utils import logger

from domain.tags import TAGS
from models.tag import Tag



def create_tags():
    logger.info('create_tags')

    tags = []

    for tag in TAGS:
        tags.append(Tag.create_or_modify(tag))

    ApiHandler.save(*tags)

    logger.info('created {} tags'.format(len(tags)))
