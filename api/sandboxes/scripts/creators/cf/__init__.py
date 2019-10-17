from sqlalchemy_api_handler import ApiHandler, logger

from repository.climate_feedback import get_articles_from_climate_feedback_feedbacks_scrap
from tests.utils.creators.create_role import create_role 
from tests.utils.creators.create_user import create_user

def create_sandbox(**kwargs):
    logger.info('create_cf_sandbox...')
    editor_user = create_user(
        email="emmanuel.vincent@sciencefeedback.fr",
        public_name="Emmanuel Vincent"
    )
    editor_user.set_password("emmanuel.Vincent.0")
    create_role(editor_user, role_type="editor")
    ApiHandler.save(editor_user)
    articles = get_articles_from_climate_feedback_feedbacks_scrap(10, editor_user)
    ApiHandler.save(*articles)
    logger.info('create_cf_sandbox...done')
