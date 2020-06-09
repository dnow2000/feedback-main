# pylint: disable=C0415
# pylint: disable=W0641
# pylint: disable=R0914

from flask_sqlalchemy.model import DefaultMeta
from repository.keywords import import_keywords
from utils.activity import import_activity
from utils.db import db


def import_models(with_creation=False):
    from models.appearance import Appearance
    from models.author_content import AuthorContent
    from models.claim import Claim
    from models.content import Content
    from models.content_tag import ContentTag
    from models.image import Image
    from models.medium import Medium
    from models.organization import Organization
    from models.review import Review
    from models.review_tag import ReviewTag
    from models.role import Role
    from models.scope import Scope
    from models.tag import Tag
    from models.user import User
    from models.user_session import UserSession
    from models.user_tag import UserTag
    from models.verdict import Verdict
    from models.verdict_reviewer import VerdictReviewer
    from models.verdict_tag import VerdictTag

    if with_creation:
        import_activity()
        db.create_all()
        db.engine.execute("CREATE INDEX IF NOT EXISTS idx_activity_objid ON activity(cast(changed_data->>'id' AS INT));")
        db.session.commit()

    import_keywords()

    return [v for v in locals().values() if type(v) == DefaultMeta]
