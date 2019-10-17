from sqlalchemy_api_handler import ApiErrors, ApiHandler

from models.user import User
from models.utils.db import db

PLAIN_DEFAULT_TESTING_PASSWORD = 'user@AZERTY123'
default_user = User()
default_user.set_password(PLAIN_DEFAULT_TESTING_PASSWORD)
HASHED_DEFAULT_TESTING_PASSWORD = default_user.password

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
    if not user.check_password(password):
        errors.add_error('password', 'Wrong password')
        raise errors

    return user

def change_password(user, password):
    if type(user) != User:
        user = User.query.filter_by(email=user).one()
    user.set_password(password)
    user = db.session.merge(user)
    ApiHandler.save(user)
