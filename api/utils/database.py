import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import orm
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.utils import logger

from domain.keywords import LANGUAGE


db = SQLAlchemy(engine_options={
    'pool_size': int(os.environ.get('DATABASE_POOL_SIZE', 3)),
})


def delete():
    logger.info('Delete all the database...')
    for table in reversed(db.metadata.sorted_tables):
        print("Deleting table {table_name}...".format(table_name=table))
        db.session.execute(table.delete())
    ApiHandler.get_activity().query.delete()
    db.session.commit()
    logger.info('Delete all the database...Done.')


def create_activity_and_transaction_tables():
    orm.configure_mappers()
    Activity = ApiHandler.get_activity()
    Activity.transaction.mapper.class_.__table__.create(db.session.get_bind())
    Activity.__table__.create(db.session.get_bind())


def create_text_search_configuration_if_not_exists(name, language=LANGUAGE):
    db.engine.execute("CREATE EXTENSION IF NOT EXISTS {};".format(name))
    configuration_query = db.engine.execute(
        "SELECT * FROM pg_ts_config WHERE cfgname='{}_{}';".format(language, name))
    if configuration_query.fetchone() is None:
        db.engine.execute("CREATE TEXT SEARCH CONFIGURATION {}_{} ( COPY = {} );".format(language, name, language))
        db.engine.execute(
            "ALTER TEXT SEARCH CONFIGURATION {}_{} "
            "ALTER MAPPING FOR hword, hword_part, word WITH {}, {}_stem;".format(language, name, name, language, language))


def create():
    logger.info('Create all the database...')
    create_activity_and_transaction_tables()
    create_text_search_configuration_if_not_exists('unaccent')
    db.create_all()
    db.session.commit()
    logger.info('Create all the database...Done.')
