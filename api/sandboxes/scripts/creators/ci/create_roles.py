import re
from sqlalchemy_api_handler import ApiHandler, logger

from models.role import RoleType
from models.user import User
from tests.utils.creators.create_role import create_role
from utils.config import COMMAND_NAME

def create_roles():
    logger.info('create_roles')

    roles_by_name = {}

    for user in User.query.all():

        full_name = "{} {}".format(user.firstName, user.lastName)
        user_type = re.match(
            r'{} Test (.*) (.*)'.format(COMMAND_NAME.upper()),
            full_name
        ).group(1)

        if user_type not in ['user', 'master']:
            roles_by_name['{} {}'.format(user.email, user_type)] = create_role(
                user,
                role_type=user_type
            )
        elif user_type == "master":
            for role_type in RoleType:
                roles_by_name['{} {}'.format(user.email, role_type)] = create_role(
                    user,
                    role_type=role_type.value
                )

    ApiHandler.save(*roles_by_name.values())

    logger.info('created {} roles'.format(len(roles_by_name)))

    return roles_by_name
