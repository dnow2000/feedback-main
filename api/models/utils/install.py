from models.keywords import install_keywords
from models.utils.activity import install_activity

from models.utils.db import db

def install_models():
    install_activity()

    db.create_all()

    install_keywords()

    db.engine.execute("CREATE INDEX IF NOT EXISTS idx_activity_objid ON activity(cast(changed_data->>'id' AS INT));")

    db.session.commit()
