""" tags """
from flask import current_app as app, jsonify, request

from models import Tag
from repository.tags import filter_tags_with_scopes
from utils.includes import TAG_INCLUDES
from utils.rest import login_or_api_key_required


@app.route('/tags', methods=['GET'])
@login_or_api_key_required
def list_tags():
    query = Tag.query

    scopes = request.args.get('scopes')
    if scopes is not None:
        query = filter_tags_with_scopes(query, scopes.split(','))

    tags = query.all()

    return jsonify([tag.asdict(includes=TAG_INCLUDES) for tag in tags])
