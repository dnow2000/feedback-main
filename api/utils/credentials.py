import random
import string
from sqlalchemy_api_handler import ApiErrors, ApiHandler

from models.utils.db import db, get_model_with_table_name


PLAIN_DEFAULT_TESTING_PASSWORD = 'user@AZERTY123'


def get_hashed_default_password():
    User = get_model_with_table_name('user')

    default_user = User()
    default_user.set_password(PLAIN_DEFAULT_TESTING_PASSWORD)
    return default_user.password


def get_user_with_credentials(identifier, password):
    errors = ApiErrors()
    errors.status_code = 401

    if identifier is None:
        errors.add_error('identifier', 'Identifier is missing.')
    if password is None:
        errors.add_error('password', 'Password is missing.')
    errors.maybe_raise()

    User = get_model_with_table_name('user')
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
    User = get_model_with_table_name('user')
    if type(user) != User:
        user = User.query.filter_by(email=user).one()
    user.set_password(password)
    user = db.session.merge(user)
    ApiHandler.save(user)


def random_password(length=12):
    password_characters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(password_characters) for i in range(length))
