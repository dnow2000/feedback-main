from flask_login import current_user
from flask import current_app as app, jsonify, request

from models import VerdictUser
from models.manager import Manager
from repository.verdicts import filter_verdicts_with_article_id
from utils.rest import expect_json_data,\
                       load_or_404,\
                       login_or_api_key_required
from validation import check_has_role

@app.route('/verdictUsers', methods=['POST'])
@login_or_api_key_required
@expect_json_data
def create_verdict_user():

    check_has_role(current_user, 'editor')

    verdict_user = VerdictUser()
    verdict_user.populateFromDict(request.json)
    Manager.check_and_save(verdict_user)
    return jsonify(verdict_user.as_dict()), 201
