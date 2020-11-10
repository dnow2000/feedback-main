# pylint: disable=C0415

from sqlalchemy_api_handler.utils import logger


def create_sandbox():
    from repository.science_feedback import sync as sync_science_feedback
    from sandboxes.creators.sf.create_features import create_features

    logger.info('create_sf_sandbox...')
    create_features()
    sync_science_feedback()
    logger.info('create_sf_sandbox...Done.')
