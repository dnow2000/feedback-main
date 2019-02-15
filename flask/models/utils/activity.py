from sqlalchemy import orm
from sqlalchemy.exc import ProgrammingError
from postgresql_audit.flask import versioning_manager

from models.utils.db import db

def install_activity():

    orm.configure_mappers()
    # FIXME: This is seriously ugly... (based on https://github.com/kvesteri/postgresql-audit/issues/21)
    try:
        versioning_manager.transaction_cls.__table__.create(db.session.get_bind())
    except ProgrammingError:
        pass
    try:
        versioning_manager.activity_cls.__table__.create(db.session.get_bind())
    except ProgrammingError:
        pass
