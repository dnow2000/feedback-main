from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import as_dict

from models.tag import Tag
from routes.utils.includes import TAG_INCLUDES
from repository.tags import filter_tags_with_scopes
from utils.rest import login_or_api_key_required


@app.route('/tags', methods=['GET'])
@login_or_api_key_required
def get_tags():
    query = Tag.query

    scopes = request.args.get('scopes')
    if scopes is not None:
        query = filter_tags_with_scopes(query, scopes.split(','))

    tags = query.all()

    return jsonify([as_dict(tag, includes=TAG_INCLUDES) for tag in tags])
