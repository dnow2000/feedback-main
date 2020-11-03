# pylint: disable=C0415

from sqlalchemy_api_handler.utils import logger


def create_sandbox():
    from repository.contents import sync as sync_contents
    from repository.tags import sync as sync_tags
    from repository.science_feedback import sync as sync_science_feedback
    from repository.users import sync as sync_users
    from sandboxes.creators.sf.create_features import create_features

    logger.info('create_sf_sandbox...')
    create_features()
    sync_tags()
    sync_science_feedback()
    sync_users()
    #sync_contents(sync_crowdtangle=True)
    logger.info('create_sf_sandbox...Done.')
