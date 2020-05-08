from sqlalchemy_api_handler import logger


def create_author_articles():
    logger.info('create_author_articles')

    author_articles = []

    logger.info('created {} author_articles'.format(len(author_articles)))
