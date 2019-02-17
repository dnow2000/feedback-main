from models.user import User
from repository.users import keep_users_with_no_role, \
                             filter_users_with_roles

from sandboxes.scripts.utils.helpers import get_user_helper

def get_existing_user_with_no_role():
    user = keep_users_with_no_role(User.query).first()

    return {
        "user": get_user_helper(user)
    }

def get_existing_admin_user():
    user = filter_users_with_roles(User.query, ['admin']).first()

    return {
        "user": get_user_helper(user)
    }

def get_existing_editor_user():
    user = filter_users_with_roles(User.query, ['editor']).first()

    return {
        "user": get_user_helper(user)
    }

def get_existing_reviewer_user():
    user = filter_users_with_roles(User.query, ['reviewer']).first()

    return {
        "user": get_user_helper(user)
    }
