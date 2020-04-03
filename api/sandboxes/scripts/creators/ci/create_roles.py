import re
from sqlalchemy_api_handler import ApiHandler, logger

from models.role import Role, RoleType
from models.user import User
from utils.config import APP_NAME, COMMAND_NAME, TLD

def create_roles():
    logger.info('create_roles')

    roles_by_name = {}

    for user in User.query.all():
        regexp = r'{}test.(.[a-z]+).(.*)@{}.{}'.format(COMMAND_NAME, APP_NAME, TLD)
        user_type = re.match(
            regexp,
            user.email
        ).group(1)

        if user_type == "master":
            for role_type in RoleType:
                roles_by_name['{} {}'.format(user.email, role_type)] = Role(
                    type=role_type,
                    user=user
                )
        elif user_type != 'user':
            roles_by_name['{} {}'.format(user.email, user_type)] = Role(
                type=getattr(RoleType, user_type.upper()),
                user=user
            )

    ApiHandler.save(*roles_by_name.values())

    logger.info('created {} roles'.format(len(roles_by_name)))

    return roles_by_name
