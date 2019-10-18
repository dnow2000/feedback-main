from models.keywords import install_keywords
from models.utils.activity import install_activity

from models.utils.db import db

def install_models():
    import models.article
    import models.article_tag
    import models.evaluation
    import models.image
    import models.review
    import models.review_tag
    import models.role
    import models.scope
    import models.tag
    import models.user
    import models.user_article
    import models.user_session
    import models.user_tag
    import models.verdict
    import models.verdict_user
    import models.verdict_tag

    install_activity()

    db.create_all()

    install_keywords()

    db.engine.execute("CREATE INDEX IF NOT EXISTS idx_activity_objid ON activity(cast(changed_data->>'id' AS INT));")

    db.session.commit()
