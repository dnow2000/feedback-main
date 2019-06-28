from flask import current_app as app, jsonify

from models import UserArticle
from utils.human_ids import dehumanize
from utils.includes import USER_ARTICLE_INCLUDES
from utils.rest import login_or_api_key_required


@app.route('/userArticles/<user_id>', methods=['GET'])
@login_or_api_key_required
def list_user_article(user_id):
    user_articles = UserArticle.query.filter_by(userId=dehumanize(user_id))
    return jsonify([
        user_article.as_dict(includes=USER_ARTICLE_INCLUDES)
        for user_article in user_articles
    ])
