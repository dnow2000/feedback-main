from sqlalchemy_api_handler import logger

from utils.db import db


def clean():
    logger.info('clean all the database...')
    for table in reversed(db.metadata.sorted_tables):
        print("Clearing table {table_name}...".format(table_name=table))
        db.session.execute(table.delete())

    db.session.commit()
    logger.info('clean all the database...Done.')
