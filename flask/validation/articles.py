""" articles """
from models.utils import ApiErrors

def check_article_is_not_yet_saved(content):
    if content.get('id'):
        api_errors = ApiErrors()
        api_errors.addError('global', "You posted an article with an id")
        raise api_errors
