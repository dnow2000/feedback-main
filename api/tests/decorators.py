from functools import wraps

from repository.database import clean


def with_clean(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        clean()
        return f(*args, **kwargs)

    return decorated_function
