from sqlalchemy_api_handler import ApiHandler, logger

from models.role import RoleType
from sandboxes.scripts.utils.storage_utils import store_public_object_from_sandbox_assets
from tests.utils.creators.create_user import create_user
from utils.credentials import HASHED_DEFAULT_TESTING_PASSWORD, \
                              PLAIN_DEFAULT_TESTING_PASSWORD
from utils.config import COMMAND_NAME, EMAIL_HOST

USERS_BY_TYPE_COUNT = 3

def create_users():
    logger.info('create_users')

    users_by_name = {}

    user_types = [role_type.value for role_type in RoleType] + ['user', 'master']

    for user_type in user_types:
        for role_index in range(USERS_BY_TYPE_COUNT):
            user = create_user(
                email="{}test.{}.{}@{}".format(COMMAND_NAME, user_type, role_index, EMAIL_HOST),
                password=PLAIN_DEFAULT_TESTING_PASSWORD,
                public_name="{} Test {} {}".format(COMMAND_NAME.upper(), user_type, role_index)
            )
            user.password = HASHED_DEFAULT_TESTING_PASSWORD
            users_by_name['{} {}'.format(user_type, role_index)] = user

    ApiHandler.save(*users_by_name.values())

    for user_type in user_types:
        for role_index in range(USERS_BY_TYPE_COUNT):
            store_public_object_from_sandbox_assets(
                "thumbs",
                users_by_name['{} {}'.format(user_type, role_index)],
                "{}_{}".format(user_type, role_index)
            )

    logger.info('created {} users'.format(len(users_by_name)))

    return users_by_name
