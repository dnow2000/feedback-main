from postgresql_audit.flask import versioning_manager
from sqlalchemy_api_handler import logger

from models.utils.db import db
from models.appearance import Appearance
from models.author_article import AuthorArticle
from models.author_scene import AuthorScene
from models.article import Article
from models.article_tag import ArticleTag
from models.claim import Claim
from models.claim_claim import ClaimClaim
from models.evaluation import Evaluation
from models.publication import Publication
from models.review import Review
from models.reviewer_publication import ReviewerPublication
from models.review_tag import ReviewTag
from models.role import Role
from models.scene import Scene
from models.scene_tag import SceneTag
from models.scope import Scope
from models.tag import Tag
from models.user import User
from models.user_tag import UserTag
from models.user_session import UserSession
from models.verdict import Verdict
from models.verdict_tag import VerdictTag
from models.verdict_reviewer import VerdictReviewer


def clean_all_database():
    """ Order of deletions matters because of foreign key constraints """
    logger.info("clean all the database...")
    Scope.query.delete()
    Appearance.query.delete()
    SceneTag.query.delete()
    ArticleTag.query.delete()
    ReviewTag.query.delete()
    UserTag.query.delete()
    VerdictTag.query.delete()
    Tag.query.delete()
    ReviewTag.query.delete()
    Review.query.delete()
    Evaluation.query.delete()
    VerdictReviewer.query.delete()
    Verdict.query.delete()
    ReviewerPublication.query.delete()
    Publication.query.delete()
    AuthorArticle.query.delete()
    Article.query.delete()
    AuthorScene.query.delete()
    Scene.query.delete()
    Role.query.delete()
    UserSession.query.delete()
    User.query.delete()
    ClaimClaim.query.delete()
    Claim.query.delete()
    versioning_manager.activity_cls.query.delete()
    db.session.commit()
    logger.info("clean all the database...Done.")
