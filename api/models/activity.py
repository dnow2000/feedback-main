from postgresql_audit.flask import versioning_manager
from sqlalchemy_api_handler import ApiHandler

from utils.db import db


versioning_manager.init(db.Model)


class Activity(ApiHandler,
               versioning_manager.activity_cls):
    __table_args__ = {'extend_existing': True}
    
    id = versioning_manager.activity_cls.id
