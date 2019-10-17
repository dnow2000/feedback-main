from functools import wraps

from models.utils.clean import clean_all_database

def with_clean_all_database(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        clean_all_database()
        return f(*args, **kwargs)

    return decorated_function
