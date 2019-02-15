""" roles """
from sqlalchemy.orm.exc import NoResultFound

from models import Role
from models.utils import ApiErrors

def check_has_role(user, type):
    try:
        Role.query.filter_by(user=user, type=type).one()
        return True
    except NoResultFound:
        api_errors = ApiErrors()
        api_errors.addError('global', "You don't have the rights for this")
        raise api_errors
