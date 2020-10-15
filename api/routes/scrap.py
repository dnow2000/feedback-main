from newspaper.article import ArticleException
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiErrors
from sqlalchemy_api_handler.serialization import as_dict

from repository.contents import content_from_url


@app.route('/scrap')
def get_scrap():
    try:
        content = content_from_url(request.args.get('url'))
    except ArticleException:
        api_errors = ApiErrors()
        api_errors.add_error('url', 'url is invalid')
        raise api_errors

    return jsonify(as_dict(content))
