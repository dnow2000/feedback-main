""" ci """
from sandboxes.scripts.creators.ci.create_article_tags import *
from sandboxes.scripts.creators.ci.create_articles import *
from sandboxes.scripts.creators.ci.create_evaluations import *
from sandboxes.scripts.creators.ci.create_tags import *
from sandboxes.scripts.creators.ci.create_review_tags import *
from sandboxes.scripts.creators.ci.create_reviews import *
from sandboxes.scripts.creators.ci.create_roles import *
from sandboxes.scripts.creators.ci.create_scopes import *
from sandboxes.scripts.creators.ci.create_user_tags import *
from sandboxes.scripts.creators.ci.create_users import *
from sandboxes.scripts.creators.ci.create_verdicts import *
from sandboxes.scripts.creators.ci.create_verdict_tags import *
from sandboxes.scripts.creators.ci.create_verdict_users import *
from utils.logger import logger

def create_sandbox(with_capture=False):
    logger.info('create_ci_sandbox...')
    create_tags()
    create_scopes()
    create_users()
    create_user_tags()
    create_roles()
    create_articles(with_capture=with_capture)
    create_article_tags()
    create_evaluations()
    create_reviews()
    create_review_tags()
    create_verdicts()
    create_verdict_tags()
    create_verdict_users()
    logger.info('create_ci_sandbox...Done.')
