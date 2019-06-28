from models.role import RoleType
from models.manager import Manager
from sandboxes.scripts.utils.storage_utils import store_public_object_from_sandbox_assets
from tests.utils import create_user
from utils.logger import logger

from utils.config import COMMAND_NAME, EMAIL_HOST

USERS_BY_TYPE_COUNT = 3

default_user = create_user()
PLAIN_PASSWORD = 'Azerty123456.'
default_user.setPassword(PLAIN_PASSWORD)
HASHED_PASSWORD = default_user.password

def create_users():
    logger.info('create_users')

    users_by_name = {}

    user_types = [role_type.value for role_type in RoleType] + ['user', 'master']

    for user_type in user_types:
        for role_index in range(USERS_BY_TYPE_COUNT):
            user = create_user(
                email="{}test.{}.{}@{}".format(COMMAND_NAME, user_type, role_index, EMAIL_HOST),
                password=None,
                public_name="{} Test {} {}".format(COMMAND_NAME.upper(), user_type, role_index)
            )
            user.password = HASHED_PASSWORD
            users_by_name['{} {}'.format(user_type, role_index)] = user

    Manager.check_and_save(*users_by_name.values())

    for user_type in user_types:
        for role_index in range(USERS_BY_TYPE_COUNT):
            store_public_object_from_sandbox_assets(
                "thumbs",
                users_by_name['{} {}'.format(user_type, role_index)],
                "{}_{}".format(user_type, role_index)
            )

    logger.info('created {} users'.format(len(users_by_name)))

    return users_by_name
