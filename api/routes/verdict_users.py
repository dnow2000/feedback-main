from flask_login import current_user
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler, as_dict, load_or_404

from models.verdict_user import VerdictUser
from utils.rest import expect_json_data, \
                       login_or_api_key_required
from validation import check_has_role

@app.route('/verdictUsers', methods=['POST'])
@login_or_api_key_required
@expect_json_data
def create_verdict_user():

    check_has_role(current_user, 'editor')

    verdict_user = VerdictUser()
    verdict_user.populate_from_dict(request.json)
    ApiHandler.save(verdict_user)
    return jsonify(as_dict(verdict_user)), 201
