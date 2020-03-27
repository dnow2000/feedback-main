import os
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiErrors
from sqlalchemy_api_handler.utils.get_result import paginate_obj

from domain.trendings import find_trendings, get_trending
from repository.trendings import keep_not_saved_trendings
from utils.config import IS_DEVELOPMENT
from utils.rest import login_or_api_key_required


TRENDINGS_PAGINATION = os.environ.get('TRENDINGS_PAGINATION', 10)


@app.route('/trendings/<id>', methods=['GET'])
@login_or_api_key_required
def get_trending(trending_id):
    trending_type = request.args.get('type')

    if not trending_type:
        api_errors = ApiErrors()
        api_errors.add_error('type', 'missing type args')
        raise api_errors

    trending = get_trending(trending_type, id)

    if not trending:
        api_errors = ApiErrors()
        api_errors.add_error('id', '{} [} not found'.format(type, id))
        raise api_errors

    return jsonify(trending), 200


@app.route('/trendings', methods=['GET'])
@login_or_api_key_required
def get_trendings():
    theme = request.args.get('theme')
    days = request.args.get('days')
    page = int(request.args.get('page', 1))
    trending_type = request.args['type']

    trendings = find_trendings(
        trending_type,
        days=days,
        max_trendings=50,
        min_shares=200,
        theme=theme
    )

    not_saved_trendings = keep_not_saved_trendings(trendings)

    not_saved_trendings = sorted(
        not_saved_trendings,
        key=lambda a: a['totalShares'],
        reverse=True
    )

    paginated_trendings = paginate_obj(
        not_saved_trendings,
        page,
        os.environ.get('TRENDINGS_PAGINATION', 10)
    ).items

    total_data_count = len(not_saved_trendings)

    response = jsonify(paginated_trendings)
    response.headers['Total-Data-Count'] = total_data_count
    response.headers['Access-Control-Expose-Headers'] = 'Total-Data-Count'

    if page:
        response.headers['Has-More'] = total_data_count > page * TRENDINGS_PAGINATION
        response.headers['Access-Control-Expose-Headers'] += ',Has-More'

    return response
