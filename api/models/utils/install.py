from models.utils.activity import import_activity
from models.utils.db import db


def install_models():
    import_activity()

    db.create_all()

    db.engine.execute("CREATE INDEX IF NOT EXISTS idx_activity_objid ON activity(cast(changed_data->>'id' AS INT));")

    db.session.commit()
