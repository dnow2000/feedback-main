import subprocess
from flask_login import current_user
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler, \
                                   as_dict, \
                                   load_or_404

from models.article import Article
from repository.articles import filter_articles_by_is_reviewable, \
                                get_articles_keywords_join_query, \
                                get_articles_query_with_keywords, \
                                resolve_content_with_url
from routes.utils.includes import ARTICLE_INCLUDES
from validation.articles import check_article_is_not_yet_saved
from validation.roles import check_has_role
from utils.config import API_ROOT_PATH
from utils.rest import expect_json_data, \
                       listify, \
                       login_or_api_key_required


@app.route('/articles', methods=['GET'])
@login_or_api_key_required
def get_articles():
    query = Article.query

    reviewable = request.args.get('reviewable')

    query = query.filter_by(isSoftDeleted=False)

    if reviewable == 'true':
        query = filter_articles_by_is_reviewable(query, True)
    elif reviewable == 'false':
        query = filter_articles_by_is_reviewable(query, False)


    keywords = request.args.get('keywords')
    if keywords is not None:
        query = get_articles_keywords_join_query(query)
        query = get_articles_query_with_keywords(query, keywords)

    return listify(Article,
                   includes=ARTICLE_INCLUDES,
                   query=query,
                   page=request.args.get('page'),
                   paginate=4,
                   with_total_data_count=True)


@app.route('/articles/<article_id>', methods=['GET'])
@login_or_api_key_required
def get_article(article_id):
    article = load_or_404(Article, article_id)
    return jsonify(as_dict(article, includes=ARTICLE_INCLUDES)), 200

@app.route('/articles', methods=['POST'])
@login_or_api_key_required
@expect_json_data
def create_article():

    check_has_role(current_user, 'editor')

    content = dict(
       resolve_content_with_url(request.json['url']),
       **request.json
    )

    check_article_is_not_yet_saved(content)

    article = Article()
    article.populate_from_dict(content)

    ApiHandler.save(article)

    # TODO: put it in a celery pipe
    p = subprocess.Popen('PYTHONPATH="." python scripts/manager.py screenshotmachine'
                         + ' --url ' + str(article.url) + ' --id ' + str(article.id),
                         shell=True,
                         cwd=API_ROOT_PATH)

    return jsonify(as_dict(article, includes=ARTICLE_INCLUDES)), 201

@app.route('/articles/<article_id>', methods=['PATCH'])
@login_or_api_key_required
@expect_json_data
def modify_article(article_id):

    check_has_role(current_user, 'editor')

    article = load_or_404(Article, article_id)
    article.populate_from_dict(request.json)

    ApiHandler.save(article)

    return jsonify(as_dict(article, includes=ARTICLE_INCLUDES)), 201

@app.route('/articles/<article_id>', methods=['DELETE'])
@login_or_api_key_required
def soft_delete_article(article_id):

    check_has_role(current_user, 'editor')

    article = load_or_404(Article, article_id)
    article.soft_delete()

    ApiHandler.save(article)

    return jsonify(as_dict(article)), 201
