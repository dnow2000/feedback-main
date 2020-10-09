from functools import wraps

from utils.db import db


def with_clean(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        clean()
        return f(*args, **kwargs)

    return decorated_function
