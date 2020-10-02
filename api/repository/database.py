from postgresql_audit.flask import versioning_manager
from sqlalchemy import orm
from sqlalchemy_api_handler import logger

from utils.db import db


def clean():
    logger.info('clean all the database...')
    for table in reversed(db.metadata.sorted_tables):
        print("Clearing table {table_name}...".format(table_name=table))
        db.session.execute(table.delete())

    db.session.commit()
    logger.info('clean all the database...Done.')


def create_activity_and_transaction_tables():
    # based on https://github.com/kvesteri/postgresql-audit/issues/21
    orm.configure_mappers()
    versioning_manager.transaction_cls.__table__.create(db.session.get_bind())
    versioning_manager.activity_cls.__table__.create(db.session.get_bind())
    db.engine.execute("CREATE INDEX IF NOT EXISTS idx_activity_objid ON activity(cast(changed_data->>'id' AS INT));")


def create():
    logger.info('create all the database...')
    create_activity_and_transaction_tables()
    db.create_all()
    db.session.commit()
    logger.info('create all the database...Done.')
