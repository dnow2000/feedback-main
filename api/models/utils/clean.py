from postgresql_audit.flask import versioning_manager
from sqlalchemy_api_handler import logger

from models.utils.db import db
from models.article import Article
from models.article_tag import ArticleTag
from models.evaluation import Evaluation
from models.review import Review
from models.review_tag import ReviewTag
from models.role import Role
from models.scope import Scope
from models.tag import Tag
from models.user import User
from models.user_article import UserArticle
from models.user_tag import UserTag
from models.user_session import UserSession
from models.verdict import Verdict
from models.verdict_tag import VerdictTag
from models.verdict_user import VerdictUser

def clean_all_database():
    """ Order of deletions matters because of foreign key constraints """
    logger.info("clean all the database...")
    Scope.query.delete()
    ArticleTag.query.delete()
    ReviewTag.query.delete()
    UserTag.query.delete()
    VerdictTag.query.delete()
    Tag.query.delete()
    ReviewTag.query.delete()
    Review.query.delete()
    Evaluation.query.delete()
    VerdictUser.query.delete()
    Verdict.query.delete()
    UserArticle.query.delete()
    Article.query.delete()
    Role.query.delete()
    UserSession.query.delete()
    User.query.delete()
    versioning_manager.activity_cls.query.delete()
    db.session.commit()
    logger.info("clean all the database...Done.")
