from sqlalchemy_api_handler import ApiErrors, ApiHandler

from models import User
from models.utils.db import db

def get_user_with_credentials(identifier, password):
    errors = ApiErrors()
    errors.status_code = 401

    if identifier is None:
        errors.add_error('identifier', 'Identifier is missing.')
    if password is None:
        errors.add_error('password', 'Password is missing.')
    errors.maybe_raise()

    user = User.query.filter_by(email=identifier).first()

    if not user:
        errors.add_error('identifier', 'Wrong identifier')
        raise errors
    if not user.isValidated:
        errors.add_error('identifier', "This account is not validated")
        raise errors
    if not user.checkPassword(password):
        errors.add_error('password', 'Wrong password')
        raise errors

    return user

def change_password(user, password):
    if type(user) != User:
        user = User.query.filter_by(email=user).one()
    user.setPassword(password)
    user = db.session.merge(user)
    ApiHandler.save(user)
