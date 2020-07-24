from flask_login import current_user
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler, \
                                   as_dict, \
                                   dehumanize, \
                                   load_or_404

from models.verdict import Verdict
from repository.verdicts import get_verdicts_join_query, \
                                keep_verdict_with_keywords
from utils.includes import VERDICT_INCLUDES
from utils.rest import expect_json_data, \
                       listify, \
                       login_or_api_key_required
from validation.roles import check_has_role


@app.route('/verdicts', methods=['GET'])
def get_verdicts():
    query = Verdict.query

    content_id = request.args.get('contentId')
    keywords = request.args.get('keywords')

    if content_id is not None:
        query = query.filter_by(contentId=dehumanize(content_id))

    if keywords is not None:
        print('Searching for keywords {}'.format(keywords))
        query = get_verdicts_join_query(query)
        query = keep_verdict_with_keywords(query, keywords)

    return listify(Verdict,
                   includes=VERDICT_INCLUDES,
                   page=request.args.get('page', 1),
                   paginate=4,
                   query=query)


@app.route('/verdicts/<verdict_id>', methods=['GET'])
@login_or_api_key_required
def get_verdict(verdict_id):
    verdict = load_or_404(Verdict, verdict_id)
    return jsonify(as_dict(verdict, includes=VERDICT_INCLUDES)), 200


@app.route('/verdicts/<verdict_id>/appearances', methods=['GET'])
def get_verdict_appearances(verdict_id):
    verdict = load_or_404(Verdict, verdict_id)
    return jsonify(as_dict(verdict, includes=VERDICT_INCLUDES)), 200


@app.route('/verdicts', methods=['POST'])
@login_or_api_key_required
@expect_json_data
def create_verdict():

    check_has_role(current_user, 'EDITOR')

    verdict = Verdict()
    verdict.modify(request.json)
    verdict.user = current_user
    ApiHandler.save(verdict)
    return jsonify(as_dict(verdict, includes=VERDICT_INCLUDES)), 201


@app.route('/verdicts/<verdict_id>', methods=['PATCH'])
@login_or_api_key_required
@expect_json_data
def edit_verdict(verdict_id):

    check_has_role(current_user, 'EDITOR')

    verdict = load_or_404(Verdict, verdict_id)
    verdict.modify(request.json)
    ApiHandler.save(verdict)
    return jsonify(as_dict(verdict, includes=VERDICT_INCLUDES)), 201
