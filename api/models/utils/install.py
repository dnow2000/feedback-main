from models.keywords import install_keywords
from models.utils.activity import install_activity

from models.utils.db import db

def import_models():
    from models.article import Article
    from models.article_tag import ArticleTag
    from models.evaluation import Evaluation
    from models.image import Image
    from models.publication import Publication
    from models.review import Review
    from models.review_tag import ReviewTag
    from models.role import Role
    from models.scope import Scope
    from models.tag import Tag
    from models.user import User
    from models.user_article import UserArticle
    from models.user_publication import UserPublication
    from models.user_session import UserSession
    from models.user_tag import UserTag
    from models.verdict import Verdict
    from models.verdict_user import VerdictUser
    from models.verdict_tag import VerdictTag
    return list(locals().values())

def install_models():
    import_models()

    install_activity()

    db.create_all()

    install_keywords()

    db.engine.execute("CREATE INDEX IF NOT EXISTS idx_activity_objid ON activity(cast(changed_data->>'id' AS INT));")

    db.session.commit()
