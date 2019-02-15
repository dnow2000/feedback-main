from postgresql_audit.flask import versioning_manager

from models.utils.db import db
from models import Article, \
                   ArticleTag, \
                   Evaluation, \
                   Review, \
                   ReviewTag, \
                   Role, \
                   Scope, \
                   Tag, \
                   User, \
                   UserArticle, \
                   UserTag, \
                   Verdict, \
                   VerdictTag, \
                   VerdictUser
from utils.logger import logger

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
    User.query.delete()
    versioning_manager.activity_cls.query.delete()
    db.session.commit()
    logger.info("clean all the database...Done.")
