from flask import current_app as app
from flask_script import Command
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.utils import humanize

from models.role import Role, RoleType
from models.user import User


@app.manager.add_command
class CreateAllRolesForUser(Command):
    name = 'create_all_roles_for_user'
    capture_all_args = True

    def run(self, args):
        email = args[0]

        user = User.create_or_modify({
            '__SEARCH_BY__': 'email',
            'email': email
        })

        roles = []
        for role_type in RoleType:
            roles.append(Role.create_or_modify({
                '__SEARCH_BY__': ['type', 'userId'],
                'type': role_type,
                'userId': humanize(user.id)
            }))

        ApiHandler.save(*roles)
