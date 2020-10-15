from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.utils import logger

from models.tag import Tag
from models.user import User
from models.user_tag import UserTag
from utils.config import APP_NAME, COMMAND_NAME, TLD


def create_user_tags():
    logger.info('create user_tags')

    user_tags = []

    user = User.query.filter_by(email='{}test.reviewer0@{}.{}'.format(COMMAND_NAME, APP_NAME, TLD)).one()
    tag = Tag.query.filter_by(label='Coral').one()
    user_tags.append(UserTag(
        user=user,
        tag=tag
    ))

    user = User.query.filter_by(email='{}test.reviewer2@{}.{}'.format(COMMAND_NAME, APP_NAME, TLD)).one()
    tag = Tag.query.filter_by(label='Immunology').one()
    user_tags.append(UserTag(
        user=user,
        tag=tag
    ))


    ApiHandler.save(*user_tags)

    logger.info('created {} user_tags'.format(len(user_tags)))
