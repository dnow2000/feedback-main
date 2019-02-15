""" verdicts """
from flask_login import current_user
from flask import current_app as app, jsonify, request

from models import Verdict
from models.manager import Manager
from repository.verdicts import filter_verdicts_with_article_id
from utils.includes import VERDICT_INCLUDES
from utils.rest import expect_json_data,\
                       load_or_404,\
                       login_or_api_key_required
from validation import check_has_role


@app.route('/verdicts', methods=['GET'])
def list_verdicts():
    query = Verdict.query

    article_id = request.args.get('articleId')
    if article_id is not None:
        query = filter_verdicts_with_article_id(query, article_id)

    verdicts = query.all()

    return jsonify([verdict.asdict(includes=VERDICT_INCLUDES) for verdict in verdicts])

@app.route('/verdicts/<verdict_id>', methods=['GET'])
@login_or_api_key_required
def get_verdict(verdict_id):
    verdict = load_or_404(Verdict, verdict_id)
    return jsonify(verdict.asdict(includes=VERDICT_INCLUDES))

@app.route('/verdicts', methods=['POST'])
@login_or_api_key_required
@expect_json_data
def create_verdict():

    check_has_role(current_user, 'editor')

    verdict = Verdict()
    verdict.populateFromDict(request.json)
    verdict.user = current_user
    Manager.check_and_save(verdict)
    return jsonify(verdict.asdict(includes=VERDICT_INCLUDES)), 201

@app.route('/verdicts/<verdict_id>', methods=['PATCH'])
@login_or_api_key_required
@expect_json_data
def edit_verdict(verdict_id):

    check_has_role(current_user, 'editor')

    verdict = load_or_404(Verdict, verdict_id)
    verdict.populateFromDict(request.json)
    Manager.check_and_save(verdict)
    return jsonify(verdict.asdict(includes=VERDICT_INCLUDES)), 201
