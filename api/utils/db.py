import os
from flask_sqlalchemy import SQLAlchemy
from postgresql_audit.flask import versioning_manager


db = SQLAlchemy(engine_options={
    'pool_size': int(os.environ.get('DATABASE_POOL_SIZE', 3)),
})

versioning_manager.init(db.Model)
