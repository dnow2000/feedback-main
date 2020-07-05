from sqlalchemy_api_handler import logger


def create_author_contents():
    logger.info('create_author_contents')

    author_contents = []

    logger.info('created {} article_author'.format(len(author_contents)))
