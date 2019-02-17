from sqlalchemy import and_

from domain.keywords import create_filter_matching_all_keywords_in_any_model, \
                            create_get_filter_matching_ts_query_in_any_model
from models.role import Role
from models.tag import Tag
from models.user import User
from models.user_tag import UserTag

user_ts_filter = create_get_filter_matching_ts_query_in_any_model(
    User,
    Tag
)

def find_user_by_email(email):
    return User.query.filter_by(email=email).first()

def find_user_by_reset_password_token(token):
    return User.query.filter_by(resetPasswordToken=token).first()

def get_users_join_query(query):
    query = query.outerjoin(UserTag)\
                 .outerjoin(Tag)
    return query

def get_users_query_with_keywords(query, keywords):
    keywords_filter = create_filter_matching_all_keywords_in_any_model(
        user_ts_filter,
        keywords
    )
    query = query.outerjoin(UserTag)\
                 .outerjoin(Tag)\
                 .filter(keywords_filter)
    return query

def filter_users_with_roles(query, roles):
    roles_filter = and_(*[User.roles.any(Role.type == role) for role in roles])
    query = query.filter(roles_filter)
    return query

def keep_users_with_no_role(query):
    query = query.filter(~User.roles.any())
    return query
