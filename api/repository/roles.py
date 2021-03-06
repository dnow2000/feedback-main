from sqlalchemy_api_handler import ApiErrors

from models.role import Role, RoleType


def user_has_role(user, role_type):
    if not user:
        return False
    if Role.query.filter_by(user=user,
                            type=getattr(RoleType, role_type)).first():
        return True
    return False

def check_user_has_role(user, role_type):
    if not user_has_role(user, role_type):
        api_errors = ApiErrors()
        api_errors.add_error('global', "You don't have the rights for this")
        raise api_errors
    return True


def are_data_anonymized_from(user):
    return not user_has_role(user, 'INSPECTOR')
