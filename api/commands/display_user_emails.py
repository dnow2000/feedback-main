from flask import current_app as app

from models.user import User


@app.manager.command
def display_user_emails():
    print([u.email for u in User.query.all()])
