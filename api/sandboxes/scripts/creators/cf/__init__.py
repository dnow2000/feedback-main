from sqlalchemy_api_handler import ApiHandler, logger

from models.user import User
from repository.climate_feedback import get_articles_from_climate_feedback_feedbacks_scrap
from tests.utils.creators.create_role import create_role

def create_sandbox(**kwargs):
    logger.info('create_cf_sandbox...')
    editor_user = User(
        email="emmanuel.vincent@sciencefeedback.fr",
        firstName="Emmanuel Vincent",
        lastName="Vincent"
    )
    editor_user.set_password("emmanuel.Vincent.0")
    create_role(editor_user, role_type="editor")
    ApiHandler.save(editor_user)
    articles = get_articles_from_climate_feedback_feedbacks_scrap(10, editor_user)
    ApiHandler.save(*articles)
    logger.info('create_cf_sandbox...done')
