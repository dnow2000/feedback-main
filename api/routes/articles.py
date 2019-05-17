""" articles """
import subprocess

from flask_login import current_user
from flask import current_app as app, jsonify, request

from models import Article
from models.manager import Manager
from repository.articles import get_articles_query_with_keywords, \
                                filter_articles_by_is_reviewable, \
                                get_articles_keywords_join_query, \
                                resolve_content_with_url
from validation.articles import check_article_is_not_yet_saved
from validation.roles import check_has_role
from utils.config import API_ROOT_PATH
from utils.includes import ARTICLE_INCLUDES
from utils.rest import expect_json_data,\
                       handle_rest_get_list, \
                       load_or_404,\
                       login_or_api_key_required


@app.route('/articles', methods=['GET'])
@login_or_api_key_required
def list_articles():
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

    return handle_rest_get_list(Article,
                                includes=ARTICLE_INCLUDES,
                                query=query,
                                page=request.args.get('page'),
                                paginate=10,
                                order_by='article.id desc')


@app.route('/articles/<article_id>', methods=['GET'])
@login_or_api_key_required
def get_article(article_id):
    article = load_or_404(Article, article_id)
    return jsonify(article.as_dict(includes=ARTICLE_INCLUDES)), 200

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
    article.populateFromDict(content)

    Manager.check_and_save(article)

    # TODO: put it in a celery pipe
    p = subprocess.Popen('PYTHONPATH="." python scripts/manager.py screenshotmachine'
                         + ' --url ' + str(article.url) + ' --id ' + str(article.id),
                         shell=True,
                         cwd=API_ROOT_PATH)

    return jsonify(article.as_dict(includes=ARTICLE_INCLUDES)), 201

@app.route('/articles/<article_id>', methods=['PATCH'])
@login_or_api_key_required
@expect_json_data
def edit_article(article_id):

    check_has_role(current_user, 'editor')

    article = load_or_404(Article, article_id)
    article.populateFromDict(request.json)

    Manager.check_and_save(article)

    return jsonify(article.as_dict(includes=ARTICLE_INCLUDES)), 201

@app.route('/articles/<article_id>', methods=['DELETE'])
@login_or_api_key_required
def soft_delete_article(article_id):

    check_has_role(current_user, 'editor')

    article = load_or_404(Article, article_id)
    article.soft_delete()

    Manager.check_and_save(article)

    return jsonify(article.as_dict()), 201
