from flask_login import current_user
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler, as_dict, load_or_404

from models.verdict_reviewer import VerdictReviewer
from utils.rest import expect_json_data, \
                       login_or_api_key_required
from validation.roles import check_has_role


@app.route('/verdictReviewers', methods=['POST'])
@login_or_api_key_required
@expect_json_data
def create_verdict_reviewer():

    check_has_role(current_user, 'editor')

    verdict_reviewer = VerdictReviewer()
    verdict_reviewer.modify(request.json)
    ApiHandler.save(verdict_reviewer)
    return jsonify(as_dict(verdict_reviewer)), 201
