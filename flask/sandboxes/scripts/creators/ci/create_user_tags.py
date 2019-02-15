from models.tag import Tag
from models.user import User
from models.manager import Manager
from tests.utils import create_user_tag
from utils.logger import logger

def create_user_tags():
    logger.info('create_user_tags')

    user_tags_by_name = {}

    user = User.query.filter_by(email="sftest.reviewer.0@sciencefeedback.co").one()
    tag = Tag.query.filter_by(text="coral").one()
    user_tags_by_name["reviewer 0 / coral"] = create_user_tag(
        user=user,
        tag=tag
    )

    user = User.query.filter_by(email="sftest.reviewer.2@sciencefeedback.co").one()
    tag = Tag.query.filter_by(text="immunology").one()
    user_tags_by_name["reviewer 2 / immunology"] = create_user_tag(
        user=user,
        tag=tag
    )

    Manager.check_and_save(*user_tags_by_name.values())

    logger.info('created {} user_tags_by_name'.format(len(user_tags_by_name)))

    return user_tags_by_name
