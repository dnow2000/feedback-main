from functools import wraps

from utils.database import db


def with_delete(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        delete()
        return f(*args, **kwargs)

    return decorated_function
