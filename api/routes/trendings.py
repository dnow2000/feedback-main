from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiErrors
from sqlalchemy_api_handler.utils.get_result import paginate_obj

from domain.trendings import DEVELOPMENT_TRENDINGS, \
                             find_trendings
from repository.trendings import keep_not_saved_trendings
from utils.config import IS_DEVELOPMENT
from utils.rest import login_or_api_key_required


@app.route('/trendings/<buzzsumo_id>', methods=['GET'])
@login_or_api_key_required
def get_trending(buzzsumo_id):

    trending = None
    if IS_DEVELOPMENT:
        buzzsumo_id_number = int(buzzsumo_id)
        kept_trendings = [
            trending for trending in DEVELOPMENT_TRENDINGS
            if trending['buzzsumoId'] == buzzsumo_id_number
        ]
        if len(kept_trendings) > 0:
            trending = kept_trendings[0]
        else:
            api_errors = ApiErrors()
            api_errors.add_error('buzzsumo_id', 'trending not found')
            raise api_errors

    return jsonify(trending), 200


@app.route('/trendings', methods=['GET'])
@login_or_api_key_required
def get_trendings():

    theme = request.args.get('theme')
    days = request.args.get('days')
    page = int(request.args.get('page', 1))

    trendings = find_trendings(
        days=days,
        max_trendings=50,
        min_shares=200,
        theme=theme,
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
        4
    ).items

    response = jsonify(paginated_trendings)
    response.headers['Total-Data-Count'] = len(not_saved_trendings)
    response.headers['Access-Control-Expose-Headers'] = 'Total-Data-Count'

    return response
