from flask_login import current_user, login_required
from flask import current_app as app, jsonify, request
from sqlalchemy import asc, desc
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import dehumanize, \
                                         load_or_404

from models.verdict import Verdict
from repository.roles import check_user_has_role, \
                             user_has_role
from repository.verdicts import keep_verdict_with_keywords
from utils.rest import expect_json_data, \
                       listify, \
                       login_or_api_key_required



def verdict_includes_from(user):
    is_anonymized = user_has_role(user, 'INSPECTOR')
    return [
        {
             'key': 'claim',
             'includes': [
                  'id',
                  'text'
              ]
        },
        'claimId',
        {
             'key': 'content',
             'includes': [
                 'id',
                 'title'
             ],
        },
        'contentId',
        {
            'key': 'editor',
            'includes': [
                 'id',
             ] + (['firstName', 'lastName'] if is_anonymized else [])
        },
        'editorId',
        'id',
        {
             'key': 'medium',
             'includes': [
                 'id',
                 'logoUrl',
                 'name'
             ]
        },
        {
            'key': 'reviews',
            'includes': [
                'id'
             ]
        },
        'scienceFeedbackPublishedDate',
        'scienceFeedbackUrl',
        'type',
        {
            'key': 'verdictTags',
            'includes': [
                'id',
                {
                    'key': 'tag',
                    'includes': [
                         'id',
                         'label'
                    ]
                }
            ]
        },
        {
            'key': 'verdictReviewers',
            'includes': [
                'id',
                {
                    'key': 'reviewer',
                    'includes': [
                         'id'
                     ] + (['firstName', 'lastName'] if is_anonymized else [])
                }
            ]
        }
    ]


def verdicts_from(user=None):
    query = Verdict.query.order_by(desc(Verdict.scienceFeedbackPublishedDate))

    content_id = request.args.get('contentId')
    keywords = request.args.get('keywords')

    if content_id is not None:
        query = query.filter_by(contentId=dehumanize(content_id))

    if keywords is not None:
        query = keep_verdict_with_keywords(query, keywords)

    return listify(Verdict,
                   includes=verdict_includes_from(user),
                   mode='only-includes',
                   page=request.args.get('page', 1),
                   paginate=6,
                   query=query)


@app.route('/verdicts/anonymized', methods=['GET'])
def get_anonymized_verdicts():
    return verdicts_from(None)


@login_required
@app.route('/verdicts', methods=['GET'])
def get_verdicts():
    return verdicts_from_user(current_user)



def verdict_from(user, verdict_id):
    verdict = load_or_404(Verdict, verdict_id)
    return jsonify(as_dict(verdict,
                           includes=verdict_includes_from(user),
                           mode='only-includes')), 200

@app.route('/verdicts/<verdict_id>/anonymized', methods=['GET'])
def get_anonymized_verdict(verdict_id):
    return verdict_from(None, verdict_id)


@login_required
@app.route('/verdicts/<verdict_id>', methods=['GET'])
def get_verdict(verdict_id):
    return verdict_from(current_user, verdict_id)




@app.route('/verdicts', methods=['POST'])
@login_or_api_key_required
@expect_json_data
def create_verdict():
    check_user_has_role(current_user, 'EDITOR')
    verdict = Verdict()
    verdict.modify(request.json)
    verdict.user = current_user
    ApiHandler.save(verdict)
    return jsonify(as_dict(verdict)), 201


@app.route('/verdicts/<verdict_id>', methods=['PATCH'])
@login_or_api_key_required
@expect_json_data
def edit_verdict(verdict_id):
    check_user_has_role(current_user, 'EDITOR')
    verdict = load_or_404(Verdict, verdict_id)
    verdict.modify(request.json)
    ApiHandler.save(verdict)
    return jsonify(as_dict(verdict)), 201
