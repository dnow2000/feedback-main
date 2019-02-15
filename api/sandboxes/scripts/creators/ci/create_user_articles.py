from models.manager import Manager
from tests.utils import create_user_article
from utils.logger import logger

def create_user_articles(users_by_name, articles_by_name):
    logger.info('create_user_articles')

    article_users_by_name = {}

    logger.info('created {} article_users_by_name'.format(len(article_users_by_name)))

    return article_users_by_name
