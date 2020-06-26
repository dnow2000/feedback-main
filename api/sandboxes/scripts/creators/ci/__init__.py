# pylint: disable=C0415

from sqlalchemy_api_handler import logger


def create_sandbox():
    from repository.tags import sync as sync_tags
    from repository.science_feedback import sync as sync_science_feedback
    from repository.users import sync as sync_users

    logger.info('create_ci_sandbox...')
    sync_tags()
    sync_science_feedback()
    sync_users()
    logger.info('create_ci_sandbox...Done.')
