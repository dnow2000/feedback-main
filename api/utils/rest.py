""" rest """
import re
from functools import wraps
from flask_login import current_user
from flask import jsonify, request

from models.utils.api_errors import ApiErrors
from utils.human_ids import dehumanize

def expect_json_data(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        if request.json is None:
            return "JSON data expected", 400
        return f(*args, **kwds)
    return wrapper

def _order_by_with_sql_ranking(query, order_by):
    try:
        order_by = [order_by] if not isinstance(order_by, list)\
                   else order_by
        query = query.order_by(*order_by)
    except ProgrammingError as e:
        field = re.search('column "?(.*?)"? does not exist', e._message, re.IGNORECASE)
        if field:
            errors = ApiErrors()
            errors.addError('order_by', 'order_by value references an unknown field : '+field.group(1))
            raise errors
        else:
            raise e
    return query

def _order_by_with_computed_ranking(query, order_by):
    elements = sorted(
        query.all(),
        key=order_by
    )

    return elements


class paginate_obj:

    """ Pagination dummy object. Takes a list and paginates it similar to sqlalchemy paginate() """
    def __init__(self, paginatable, page, per_page):
        self.has_next = (len(paginatable)/per_page) > page
        self.has_prev = bool(page - 1)
        self.next = page + self.has_next
        self.prev = page - self.has_prev
        self.items = paginatable[(page-1)*(per_page):(page)*(per_page)]

def handle_rest_get_list(modelClass, query=None,
                         order_by=None,
                         includes=None, resolve=None, print_elements=None,
                         paginate=None, page=None):

    # INIT
    if query is None:
        query = modelClass.query

    # ORDER BY
    is_already_queried = False
    if order_by:
        if type(order_by).__name__ != 'function':
            query = _order_by_with_sql_ranking(query, order_by)
        else:
            elements = _order_by_with_computed_ranking(query, order_by)
            is_already_queried = True

    # PAGINATE
    if paginate:
        if page is not None:
            page = int(page)

        if is_already_queried:
            pagination = paginate_obj(elements, page, paginate)
        else:
            pagination = query.paginate(page, per_page=paginate, error_out=False)\

        query = pagination.items

    # DICTIFY
    elements = [o.as_dict(includes=includes, resolve=resolve) for o in query]
    # PRINT
    if print_elements:
        print(elements)
    # RETURN
    return jsonify(elements), 200

def load_or_404(obj_class, human_id):
    return obj_class.query.filter_by(id=dehumanize(human_id))\
                          .first_or_404()

def login_or_api_key_required(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        if not current_user.is_authenticated:
            api_errors = ApiErrors()
            api_errors.status_code = 403
            api_errors.addError('global', "API key or login required")
            raise api_errors
        return f(*args, **kwds)
    return wrapper
