from flask_login import current_user, login_required
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiErrors, ApiHandler
from sqlalchemy_api_handler.utils import logger

from domain.password import check_new_password_validity, \
                            check_password_strength, \
                            check_reset_token_validity, \
                            generate_reset_token, \
                            validate_change_password_request, \
                            validate_new_password_request, \
                            validate_reset_request
from repository.users import find_user_by_email, \
                             find_user_by_reset_password_token
from utils.rest import expect_json_data


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
    current_user.set_password(new_password)
    ApiHandler.save(current_user)
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
        api_errors.add_error('token', 'Votre lien de changement de mot de passe est invalide.')
        raise api_errors

    check_reset_token_validity(user)
    check_password_strength('newPassword', new_password)
    user.set_password(new_password)
    ApiHandler.save(user)
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
    ApiHandler.save(user)


    """
    app_origin_url = request.headers.get('origin')
    try:
        send_reset_password_email(user, app.mailjet_client.send.create, app_origin_url)
    except MailServiceException as e:
        logger.error('Mail service failure', e)
    """

    return '', 204
