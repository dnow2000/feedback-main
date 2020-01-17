from flask_login import current_user, login_required
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler, \
                                   as_dict, \
                                   listify, \
                                   load_or_404

from models.user import User
from repository.users import filter_users_with_roles, \
                             get_users_join_query, \
                             get_users_query_with_keywords
from routes.utils.includes import USER_INCLUDES
from utils.rest import expect_json_data,\
                       login_or_api_key_required
from validation import check_has_role


def make_user_query():
    query = User.query
    return query


@app.route("/users", methods=["GET"])
@login_required
def get_users():
    check_has_role(current_user, 'admin')

    query = User.query

    roles = request.args.get('roles')
    if roles is not None:
        query = filter_users_with_roles(query, roles.split(','))

    keywords = request.args.get('keywords')
    if keywords is not None:
        query = get_users_join_query(query)
        query = get_users_query_with_keywords(query, keywords)

    user_dicts, total_data_count = listify(User,
                                            includes=USER_INCLUDES,
                                            query=query,
                                            page=request.args.get('page'),
                                            paginate=10,
                                            with_total_data_count=True)

    response = jsonify(user_dicts)
    response.headers['Total-Data-Count'] = total_data_count
    response.headers['Access-Control-Expose-Headers'] = 'Total-Data-Count'

    return response


@app.route("/users/<user_id>", methods=["GET"])
@login_required
def get_user(user_id):
    check_has_role(current_user, 'admin')

    user = load_or_404(User, user_id)
    return jsonify(as_dict(user, includes=USER_INCLUDES)), 200


@app.route('/users/current', methods=['PATCH'])
@login_or_api_key_required
@expect_json_data
def patch_profile():
    current_user.populate_from_dict(request.json)
    ApiHandler.save(current_user)
    return jsonify(as_dict(current_user, includes=USER_INCLUDES)), 200
