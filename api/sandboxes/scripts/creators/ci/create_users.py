from sqlalchemy_api_handler import ApiHandler, logger

from models.role import RoleType
from models.user import User
from sandboxes.scripts.utils.storage_utils import store_public_object_from_sandbox_assets
from sandboxes.scripts.utils.helpers import get_sandbox_role_email
from utils.credentials import HASHED_DEFAULT_TESTING_PASSWORD
from utils.config import COMMAND_NAME

USERS_BY_TYPE_COUNT = 3

def create_users():
    logger.info('create_users')

    users_by_name = {}

    user_types = [role_type.value for role_type in RoleType] + ['user', 'master']

    for user_type in user_types:
        for role_index in range(USERS_BY_TYPE_COUNT):
            user_dict = {
                "email": get_sandbox_role_email(user_type, role_index),
                "firstName": "{} Test".format(COMMAND_NAME.upper()),
                "lastName": "{} {}".format(user_type, role_index),
            }
            user = User(**user_dict)
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
