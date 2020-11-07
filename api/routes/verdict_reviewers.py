from flask_login import current_user, login_required
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import load_or_404

from models.verdict_reviewer import VerdictReviewer
from repository.roles import check_user_has_role
from utils.rest import expect_json_data, \
                       login_or_api_key_required


GET_VERDICT_REVIEWER_INCLUDES = [
    'id',
    {
        'key': 'reviewer',
        'includes': [
            'firstName',
            'id',
            'lastName',
            {
                'key': 'userTags',
                'includes': [
                    'id',
                    {
                        'key': 'tag',
                        'includes': [
                            'id',
                            'info',
                            'label'
                        ]
                    },
                    'tagId'
                ]
            }
        ]
    },
    'reviewerId',
    {
        'key': 'verdict',
        'includes': [
            {
                'key': 'editor',
                'includes': [
                    'firstName',
                    'id',
                    'lastName',
                    {
                        'key': 'userTags',
                        'includes': [
                            'id',
                            {
                                'key': 'tag',
                                'includes': [
                                    'id',
                                    'info',
                                    'label'
                                ]
                            },
                            'tagId'
                        ]
                    }
                ]
            },
            'editorId',
            'id',
        ]
    },
    'verdictId'
]



@app.route('/verdictReviewers', methods=['GET'])
@login_required
def get_verdict_reviewers():
    check_user_has_role(current_user, 'EDITOR')

    query = VerdictReviewer.query

    keywords = request.args.get('keywords')
    if keywords is not None:
        query = keep_verdict_with_keywords(query, keywords)

    verdict_id = request.args.get('verdictId')
    if verdict_id is not None:
        query = query.filter_by(verdictId=dehumanize(verdict_id))

    return listify(VerdictReviewer,
                   includes=GET_VERDICT_REVIEWER_INCLUDES,
                   mode='only-includes',
                   page=request.args.get('page', 1),
                   paginate=6,
                   query=query)


@app.route('/verdictReviewers', methods=['POST'])
@login_or_api_key_required
@expect_json_data
def create_verdict_reviewer():
    check_user_has_role(current_user, 'EDITOR')
    verdict_reviewer = VerdictReviewer()
    verdict_reviewer.modify(request.json)
    ApiHandler.save(verdict_reviewer)
    return jsonify(as_dict(verdict_reviewer)), 201
