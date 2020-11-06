from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import dehumanize, \
                                         load_or_404

from models.appearance import Appearance
from repository.roles import user_has_role
from utils.rest import listify


def appearance_includes_from(user):
    is_anonymized = user_has_role(user, 'INSPECTOR')
    return [
        'id',
        'quotedClaimId',
        'quotedContentId',
        {
            'key': 'quotingContent',
            'includes': [
                {
                    'key': 'authorContents',
                    'includes': [
                        {
                            'key': 'author',
                            'includes': [
                                'id'
                            ] + (['firstName', 'lastName'] if not is_anonymized else [])
                        },
                        'id'
                    ]
                },
                'id',
                {
                    'key': 'medium',
                    'includes': [
                        'id'
                    ]
                },
                'title',
                'totalShares',
                'type'
            ]
        },
        'quotingContentId',
        #'subType',
        'stance',
        'testifierId'
        #'type',
    ]


def appearances_from(user):
    query = Appearance.query

    # TODO optimize filter with predefined type AppearanceType.LINK or AppearanceType.INTERACTION
    # if request.args.get('type'):
    #    query = query.filter_by(type=getattr(AppearanceType, request.args.get('type')))

    for key in ['quotedClaimId', 'quotedContentId']:
        if request.args.get(key):
            query = query.filter_by(**{key: dehumanize(request.args.get(key))})

    return listify(Appearance,
                   includes=appearance_includes_from(user),
                   mode='only-includes',
                   page=request.args.get('page', 1),
                   paginate=int(request.args.get('limit', 10)),
                   query=query)


@login_required
@app.route('/appearances', methods=['GET'])
def get_appearances():
    return appearances_from(current_user)


@app.route('/appearances/anonymized', methods=['GET'])
def get_anonymized_appearances():
    return appearances_from(None)


def appearance_from(user, appearance_id):
    appearance = load_or_404(Appearance, appearance_id)
    return jsonify(as_dict(appearance,
                           includes=appearances_from(user),
                           mode='only-includes')), 200


@app.route('/appearances/<appearance_id>', methods=['GET'])
def get_appearance(appearance_id):
    return appearance_from(None, appearance_id)


@login_required
@app.route('/appearances/<appearance_id>/anonymized', methods=['GET'])
def get_anonymized_appearance(appearance_id):
    return appearance_from(current_user, appearance_id)
