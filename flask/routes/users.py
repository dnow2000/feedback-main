"""users routes"""
from flask_login import current_user, login_required, logout_user, login_user
from sqlalchemy.sql.expression import and_
from flask import current_app as app, jsonify, request
import gspread

from domain.password import check_new_password_validity, \
                            check_password_strength, \
                            check_reset_token_validity, \
                            generate_reset_token, \
                            validate_change_password_request, \
                            validate_new_password_request, \
                            validate_reset_request
from models import User
from models.manager import Manager
from models.utils import ApiErrors
from repository.users import filter_users_with_roles, \
                             find_user_by_email, \
                             find_user_by_reset_password_token, \
                             get_users_join_query, \
                             get_users_query_with_keywords
from utils.credentials import get_user_with_credentials
from utils.includes import USER_INCLUDES
from utils.login_manager import stamp_session, discard_session
from utils.rest import expect_json_data,\
                       handle_rest_get_list, \
                       load_or_404, \
                       login_or_api_key_required
from validation import check_has_role


def make_user_query():
    query = User.query
    return query

@app.route("/users/current", methods=["GET"])
@login_required
def get_profile():
    user = current_user.asdict(includes=USER_INCLUDES)
    return jsonify(user)

@app.route('/users/current/change-password', methods=['POST'])
@login_required
@expect_json_data
def post_change_password():
    json = request.get_json()
    validate_change_password_request(json)
    new_password = request.get_json()['newPassword']
    old_password = json.get('oldPassword')
    check_password_strength('newPassword', new_password)
    check_new_password_validity(current_user, old_password, new_password)
    current_user.setPassword(new_password)
    Manager.check_and_save(current_user)
    return '', 204

@app.route("/users/reset-password", methods=['POST'])
@expect_json_data
def post_for_password_token():
    validate_reset_request(request)
    email = request.get_json()['email']
    user = find_user_by_email(email)

    if not user:
        return '', 204

    generate_reset_token(user)
    Manager.check_and_save(user)
    app_origin_url = request.headers.get('origin')

    """
    try:
        send_reset_password_email(user, app.mailjet_client.send.create, app_origin_url)
    except MailServiceException as e:
        app.logger.error('Mail service failure', e)
    """

    return '', 204

@app.route("/users/new-password", methods=['POST'])
@expect_json_data
def post_new_password():
    validate_new_password_request(request)
    token = request.get_json()['token']
    new_password = request.get_json()['newPassword']
    user = find_user_by_reset_password_token(token)

    if not user:
        api_errors = ApiErrors()
        api_errors.addError('token', 'Votre lien de changement de mot de passe est invalide.')
        raise api_errors

    check_reset_token_validity(user)
    check_password_strength('newPassword', new_password)
    user.setPassword(new_password)
    Manager.check_and_save(user)
    return '', 204

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

    return handle_rest_get_list(User,
                                includes=USER_INCLUDES,
                                query=query,
                                page=request.args.get('page'),
                                paginate=10)

@app.route("/users/<user_id>", methods=["GET"])
@login_required
def get_user(user_id):
    check_has_role(current_user, 'admin')

    user = load_or_404(User, user_id)
    return jsonify(user.asdict(includes=USER_INCLUDES)), 200

@app.route('/users/current', methods=['PATCH'])
@login_or_api_key_required
@expect_json_data
def patch_profile():
    current_user.populateFromDict(request.json)
    Manager.check_and_save(current_user)
    return jsonify(current_user.asdict(includes=USER_INCLUDES)), 200


@app.route("/users/signin", methods=["POST"])
def signin():
    json = request.get_json()
    identifier = json.get("identifier")
    password = json.get("password")
    user = get_user_with_credentials(identifier, password)
    login_user(user, remember=True)
    stamp_session(user)
    return jsonify(user.asdict(includes=USER_INCLUDES)), 200


@app.route("/users/signout", methods=["GET"])
@login_required
def signout():
    discard_session()
    logout_user()
    return jsonify({"global": "Disconnected"})


@app.route("/users", methods=["POST"])
def signup():
    new_user = User(from_dict=request.json)
    new_user.id = None
    Manager.check_and_save(new_user)
    login_user(new_user)
    return jsonify(new_user.asdict(includes=USER_INCLUDES)), 201
