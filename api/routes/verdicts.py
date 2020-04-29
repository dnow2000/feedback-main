from flask_login import current_user
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler, as_dict, load_or_404

from models.verdict import Verdict
from repository.verdicts import filter_verdicts_with_article_id
from routes.utils.includes import VERDICT_INCLUDES
from utils.rest import expect_json_data, \
                       listify, \
                       login_or_api_key_required
from validation import check_has_role


@app.route('/verdicts', methods=['GET'])
def get_verdicts():
    query = Verdict.query

    article_id = request.args.get('articleId')
    if article_id is not None:
        query = filter_verdicts_with_article_id(query, article_id)

    return listify(Verdict,
                   includes=VERDICT_INCLUDES,
                   page=request.args.get('page'),
                   paginate=10,
                   query=query)


@app.route('/verdicts/<verdict_id>', methods=['GET'])
@login_or_api_key_required
def get_verdict(verdict_id):
    verdict = load_or_404(Verdict, verdict_id)
    return jsonify(as_dict(verdict, includes=VERDICT_INCLUDES)), 200


@app.route('/verdicts', methods=['POST'])
@login_or_api_key_required
@expect_json_data
def create_verdict():

    check_has_role(current_user, 'editor')

    verdict = Verdict()
    verdict.modify(request.json)
    verdict.user = current_user
    ApiHandler.save(verdict)
    return jsonify(as_dict(verdict, includes=VERDICT_INCLUDES)), 201


@app.route('/verdicts/<verdict_id>', methods=['PATCH'])
@login_or_api_key_required
@expect_json_data
def edit_verdict(verdict_id):

    check_has_role(current_user, 'editor')

    verdict = load_or_404(Verdict, verdict_id)
    verdict.modify(request.json)
    ApiHandler.save(verdict)
    return jsonify(as_dict(verdict, includes=VERDICT_INCLUDES)), 201
