from functools import wraps
from flask_login import current_user
from flask import jsonify, request
from sqlalchemy_api_handler import ApiErrors, get_result

def expect_json_data(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        if request.json is None:
            return "JSON data expected", 400
        return f(*args, **kwds)
    return wrapper


def listify(*args, **kwargs):
    result = get_result(*args, **kwargs)

    response = jsonify(result['data'])

    if 'total_data_count' in result:
        response.headers['Total-Data-Count'] = result['total_data_count']
        response.headers['Access-Control-Expose-Headers'] = 'Total-Data-Count'

    return response


def login_or_api_key_required(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        if not current_user.is_authenticated:
            api_errors = ApiErrors()
            api_errors.status_code = 403
            api_errors.add_error('global', "API key or login required")
            raise api_errors
        return f(*args, **kwds)
    return wrapper
