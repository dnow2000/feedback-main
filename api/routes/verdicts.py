from flask_login import current_user, login_required
from flask import current_app as app, jsonify, request
from sqlalchemy import asc, desc
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import dehumanize, \
                                         load_or_404

from models.verdict import Verdict
from repository.roles import check_user_has_role
from repository.verdicts import keep_verdict_with_keywords
from utils.rest import expect_json_data, \
                       listify


GET_VERDICT_INCLUDES = [
    {
         'key': 'claim',
         'includes': [
              'id',
              'linksCount',
              'sharesCount',
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
    'id',
    {
         'key': 'medium',
         'includes': [
             'id',
             'logoUrl',
             'name'
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
                     'info',
                     'label',
                     'type'
                ]
            },
            'tagId',
            'verdictId'
        ]
    },
]


@login_required
@app.route('/verdicts', methods=['GET'])
def get_verdicts():
    query = Verdict.query.order_by(desc(Verdict.scienceFeedbackPublishedDate))

    content_id = request.args.get('contentId')
    if content_id is not None:
        query = query.filter_by(contentId=dehumanize(content_id))

    keywords = request.args.get('keywords')
    if keywords is not None:
        query = keep_verdict_with_keywords(query, keywords)

    return listify(Verdict,
                   includes=GET_VERDICT_INCLUDES,
                   mode='only-includes',
                   page=request.args.get('page', 1),
                   paginate=6,
                   query=query)


@app.route('/verdicts/<verdict_id>', methods=['GET'])
def get_verdict(verdict_id):
    verdict = load_or_404(Verdict, verdict_id)
    return jsonify(as_dict(verdict,
                           includes=GET_VERDICT_INCLUDES,
                           mode='only-includes')), 200


@app.route('/verdicts', methods=['POST'])
@login_required
@expect_json_data
def create_verdict():
    check_user_has_role(current_user, 'EDITOR')
    verdict = Verdict()
    verdict.modify(request.json)
    verdict.user = current_user
    ApiHandler.save(verdict)
    return jsonify(as_dict(verdict)), 201
