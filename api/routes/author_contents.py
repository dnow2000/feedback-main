from flask import current_app as app, jsonify
from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import dehumanize

from models.author_content import AuthorContent
from utils.rest import login_or_api_key_required


@app.route('/authorContents/<user_id>', methods=['GET'])
@login_or_api_key_required
def get_author_content(user_id):
    author_contents = AuthorContent.query.filter_by(userId=dehumanize(user_id))

    return jsonify([
        as_dict(author_content)
        for author_content in author_contents
    ])
