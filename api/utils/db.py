import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_api_handler import ApiHandler, logger

from domain.keywords import LANGUAGE


db = SQLAlchemy(engine_options={
    'pool_size': int(os.environ.get('DATABASE_POOL_SIZE', 3)),
})

ApiHandler.set_db(db)


def clean():
    logger.info('clean all the database...')
    for table in reversed(db.metadata.sorted_tables):
        print("Clearing table {table_name}...".format(table_name=table))
        db.session.execute(table.delete())

    db.session.commit()
    logger.info('clean all the database...Done.')


def create_activity_and_transaction_tables():
    from models.activity import Activity
    # based on https://github.com/kvesteri/postgresql-audit/issues/21
    orm.configure_mappers()
    versioning_manager.transaction_cls.__table__.create(db.session.get_bind())
    Activity.__table__.create(db.session.get_bind())
    db.engine.execute("CREATE INDEX IF NOT EXISTS idx_activity_objid ON activity(cast(changed_data->>'id' AS INT));")


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
    logger.info('create all the database...')
    create_activity_and_transaction_tables()
    create_text_search_configuration_if_not_exists('unaccent')
    db.create_all()
    db.session.commit()
    logger.info('create all the database...Done.')
