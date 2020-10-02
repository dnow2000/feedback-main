import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_api_handler import ApiHandler


db = SQLAlchemy(engine_options={
    'pool_size': int(os.environ.get('DATABASE_POOL_SIZE', 3)),
})

ApiHandler.set_db(db)
