""" credentials """
from models import User
from models.manager import Manager
from models.utils.db import db
from models.utils.api_errors import ApiErrors

def get_user_with_credentials(identifier, password):
    errors = ApiErrors()
    errors.status_code = 401

    if identifier is None:
        errors.addError('identifier', 'Identifier is missing.')
    if password is None:
        errors.addError('password', 'Password is missing.')
    errors.maybeRaise()

    user = User.query.filter_by(email=identifier).first()

    if not user:
        errors.addError('identifier', 'Wrong identifier')
        raise errors
    if not user.isValidated:
        errors.addError('identifier', "This account is not validated")
        raise errors
    if not user.checkPassword(password):
        errors.addError('password', 'Wrong password')
        raise errors

    return user

def change_password(user, password):
    if type(user) != User:
        user = User.query.filter_by(email=user).one()
    user.setPassword(password)
    user = db.session.merge(user)
    Manager.check_and_save(user)
