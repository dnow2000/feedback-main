from sqlalchemy_api_handler import ApiHandler, logger

from models.role import Role
from models.user import User
from repository.climate_feedback import get_articles_from_climate_feedback_feedbacks_scrap

def create_sandbox(**kwargs):
    logger.info('create_cf_sandbox...')
    editor_user = User(
        email="emmanuel.vincent@sciencefeedback.fr",
        firstName="Emmanuel Vincent",
        lastName="Vincent"
    )
    editor_user.set_password("emmanuel.Vincent.0")
    role = Role(editor_user, role_type="editor")
    ApiHandler.save(editor_user)
    articles = get_articles_from_climate_feedback_feedbacks_scrap(10, editor_user)
    ApiHandler.save(*articles)
    logger.info('create_cf_sandbox...done')
