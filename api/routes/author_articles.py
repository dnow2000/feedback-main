from flask import current_app as app, jsonify
from sqlalchemy_api_handler import as_dict, dehumanize

from models.author_article import AuthorArticle
from utils.rest import login_or_api_key_required


@app.route('/authorArticles/<user_id>', methods=['GET'])
@login_or_api_key_required
def get_user_article(user_id):
    author_articles = AuthorArticle.query.filter_by(userId=dehumanize(user_id))

    return jsonify([
        as_dict(author_article)
        for author_article in author_articles
    ])
