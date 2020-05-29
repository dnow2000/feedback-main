from postgresql_audit.flask import versioning_manager
from sqlalchemy_api_handler import logger

from models.appearance import Appearance
from models.author_content import AuthorContent
from models.claim import Claim
from models.content import Content
from models.content_tag import ContentTag
from models.evaluation import Evaluation
from models.medium import Medium
from models.review import Review
from models.review_tag import ReviewTag
from models.role import Role
from models.scope import Scope
from models.tag import Tag
from models.user import User
from models.user_tag import UserTag
from models.user_session import UserSession
from models.verdict import Verdict
from models.verdict_tag import VerdictTag
from models.verdict_reviewer import VerdictReviewer
from utils.db import db


def clean_all_database():
    """ Order of deletions matters because of foreign key constraints """
    logger.info("clean all the database...")
    Scope.query.delete()
    Appearance.query.delete()
    ContentTag.query.delete()
    ReviewTag.query.delete()
    UserTag.query.delete()
    VerdictTag.query.delete()
    Tag.query.delete()
    ReviewTag.query.delete()
    Review.query.delete()
    Evaluation.query.delete()
    VerdictReviewer.query.delete()
    Verdict.query.delete()
    AuthorContent.query.delete()
    Content.query.delete()
    Role.query.delete()
    UserSession.query.delete()
    Medium.query.delete()
    User.query.delete()
    Claim.query.delete()
    versioning_manager.activity_cls.query.delete()
    db.session.commit()
    logger.info("clean all the database...Done.")
