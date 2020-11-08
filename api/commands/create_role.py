from flask import current_app as app
from flask_script import Command
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.utils import humanize

from commands.filter import printify
from models.role import Role, RoleType
from models.user import User


@app.manager.add_command
class CreateRole(Command):
    name = 'create_role'
    capture_all_args = True

    def run(self, args):
        email = args[0]
        user = User.query.filter_by(email=email).one()
        role_type = getattr(RoleType, args[1])
        role = Role.create_or_modify({
            '__SEARCH_BY__': ['type', 'userId'],
            'type': role_type,
            'userId': humanize(user.id)
        })

        ApiHandler.save(role)

        printify(role)
