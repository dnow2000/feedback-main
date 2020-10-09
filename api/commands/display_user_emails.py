from flask import current_app as app
from flask_script import Command

from models.user import User


@app.manager.add_command
class DisplayUserEmailsCommand(Command):
    name = 'display_user_emails'

    def run (self):
        print([u.email for u in User.query.all()])
