from sqlalchemy.orm.exc import NoResultFound
from sqlalchemy_api_handler import ApiErrors

from models.role import Role


def check_has_role(user, role_type):
    # try:
    #     role = Role.query.filter_by(user=user, type=role_type).one()
    #     print('role is {}'.format(role))
    #     return True
    # except NoResultFound:
    #     api_errors = ApiErrors()
    #     api_errors.add_error('global', "You don't have the rights for this")
    #     raise api_errors
    role = Role.query.filter_by(user=user, type=role_type).first()
    print('role type is {}'.format(role_type))
    print('role is {}'.format(role))
    print('user\'s roles are {}'.format(user.roles))
    return True
