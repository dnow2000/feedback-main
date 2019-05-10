from newspaper.article import ArticleException
from flask import current_app as app, jsonify, request

from models.utils import ApiErrors
from repository.articles import resolve_content_with_url

@app.route('/scrap')
def get_scrap():
    try:
        content = resolve_content_with_url(request.args.get('url'))
    except ArticleException:
        api_errors = ApiErrors()
        api_errors.addError('url', 'url is invalid')
        raise api_errors

    return jsonify(content)
