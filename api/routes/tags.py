from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import as_dict

from models.tag import Tag
from repository.tags import keep_tags_with_scopes, \
                            keep_tags_with_type
from utils.includes import TAG_INCLUDES
from utils.rest import login_or_api_key_required


@app.route('/tags', methods=['GET'])
@login_or_api_key_required
def get_tags():
    query = Tag.query

    tag_type = request.args.get('type')
    if tag_type is not None:
        query = keep_tags_with_type(query, tag_type)

    scopes = request.args.get('scopes')
    if scopes is not None:
        query = keep_tags_with_scopes(query, scopes.split(','))

    tags = query.all()

    return jsonify([as_dict(tag, includes=TAG_INCLUDES) for tag in tags])
