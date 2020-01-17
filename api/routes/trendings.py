from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler.utils.listify import paginate_obj

from domain.trendings import get_topic_with_theme, get_trendings
from repository.trendings import keep_not_saved_trendings
from utils.rest import login_or_api_key_required


@app.route('/trendings', methods=['GET'])
@login_or_api_key_required
def list_trendings():

    theme = request.args.get('theme')
    days = request.args.get('days')
    topic = get_topic_with_theme(theme)

    trendings = get_trendings(
        days=days,
        max_trendings=50,
        min_shares=200,
        topic=topic,
    )

    not_saved_trendings = keep_not_saved_trendings(trendings)

    not_saved_trendings = sorted(
        not_saved_trendings,
        key=lambda a: a['totalShares'],
        reverse=True
    )

    paginated_trendings = paginate_obj(
        not_saved_trendings,
        int(request.args.get('page', 1)),
        4
    ).items

    response = jsonify(paginated_trendings)
    response.headers['Total-Data-Count'] = len(not_saved_trendings)
    response.headers['Access-Control-Expose-Headers'] = 'Total-Data-Count'

    return response
