from sqlalchemy_api_handler import logger

from sandboxes.creators.ci.create_appearances import *
from sandboxes.creators.ci.create_author_contents import *
from sandboxes.creators.ci.create_claims import *
from sandboxes.creators.ci.create_tags import *
from sandboxes.creators.ci.create_review_tags import *
from sandboxes.creators.ci.create_reviews import *
from sandboxes.creators.ci.create_roles import *
from sandboxes.creators.ci.create_contents import *
from sandboxes.creators.ci.create_content_tags import *
from sandboxes.creators.ci.create_scopes import *
from sandboxes.creators.ci.create_user_tags import *
from sandboxes.creators.ci.create_users import *
from sandboxes.creators.ci.create_verdicts import *
from sandboxes.creators.ci.create_verdict_tags import *
from sandboxes.creators.ci.create_verdict_reviewers import *


def create_sandbox(with_capture=False):
    logger.info('create_ci_sandbox...')
    create_claims()
    create_tags()
    create_scopes()
    create_users()
    create_user_tags()
    create_roles()
    create_contents(with_capture=with_capture)
    create_content_tags()
    create_author_contents()
    create_appearances()
    create_reviews()
    create_review_tags()
    create_verdicts()
    create_verdict_tags()
    create_verdict_reviewers()
    logger.info('create_ci_sandbox...Done.')
