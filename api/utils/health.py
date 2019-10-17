from sqlalchemy_api_handler import logger

from models.user import User

def check_database_health():
    database_working = False
    try:
        User.query.limit(1).all()
        database_working = True
        output = "Database health is ok"
    except Exception as e:
        logger.critical(str(e))
        output = "Database health is not ok"

    return database_working, output
