from sqlalchemy import text
from postgresql_audit.flask import versioning_manager

from models.utils.db import db

class VersionedMixin(object):
    __versioned__ = {}

    def activity(self):
        Activity = versioning_manager.activity_cls
        text_filter = text(
            "table_name='" + self.__tablename__ \
            + "' AND cast(changed_data->>'id' AS INT) = " + str(self.id)
        )
        return Activity.query.filter(text_filter)\
                             .order_by(db.desc(Activity.id))
