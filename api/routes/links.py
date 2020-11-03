from flask import current_app as app, jsonify, request
from flask_login import current_user, login_required
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import dehumanize, \
                                         load_or_404

from models.link import Link, LinkType
from repository.roles import are_data_anonymized_from
from utils.rest import listify


def link_includes_from(user, sub_type=None):
    are_data_anonymized = are_data_anonymized_from(user)
    return [
        'id',
        'linkedClaimId',
        'linkedContentId',
        {
            'key': 'linkingContent',
            'includes': [
                'archiveUrl',
                {
                    'key': 'authorContents',
                    'includes': [
                        {
                            'key': 'author',
                            'includes': [
                                'id'
                            ] + (['firstName', 'lastName'] if not are_data_anonymized else [])
                        },
                        'id'
                    ]
                },
                'hostname',
                'id',
                {
                    'key': 'medium',
                    'includes': [
                        'id'
                    ] + (['logoUrl', 'name'] if sub_type == 'QUOTATION' or not are_data_anonymized else [])
                },
                'summary',
                'title',
                'thumbCount',
                'totalInteractions',
                'totalShares',
                'type',
                'url'
            ]
        },
        'linkingContentId',
        'subType',
        'stance',
        'testifierId'
        'type',
    ]


def links_from(user):
    query = Link.query

    if request.args.get('type'):
        query = query.filter_by(type=getattr(LinkType, request.args.get('type')))

    for key in ['linkedClaimId', 'linkedContentId']:
        if request.args.get(key):
            query = query.filter_by(**{key: dehumanize(request.args.get(key))})

    return listify(Link,
                   includes=link_includes_from(user, request.args.get('subType')),
                   mode='only-includes',
                   page=request.args.get('page', 1),
                   paginate=int(request.args.get('limit', 10)),
                   query=query)


@login_required
@app.route('/links', methods=['GET'])
def get_links():
    return links_from(current_user)


@app.route('/links/anonymized', methods=['GET'])
def get_anonymized_links():
    return links_from(None)


def link_from(user, link_id):
    link = load_or_404(Link, link_id)
    return jsonify(as_dict(link,
                           includes=link_includes_from(user, request.args.get('subType')),
                           mode='only-includes')), 200


@app.route('/links/<link_id>', methods=['GET'])
def get_link(link_id):
    return link_from(None, link_id)


@login_required
@app.route('/links/<link_id>/anonymized', methods=['GET'])
def get_anonymized_link(link_id):
    return link_from(current_user, link_id)
