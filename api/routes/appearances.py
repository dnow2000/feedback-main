from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import dehumanize, \
                                         load_or_404

from models.appearance import Appearance
from utils.includes import APPEARANCE_INCLUDES
from utils.rest import listify


@app.route('/appearances', methods=['GET'])
def get_appearances():
    query = Appearance.query

    # TODO optimize filter with predefined type AppearanceType.LINK or AppearanceType.INTERACTION
    # if request.args.get('type'):
    #    query = query.filter_by(type=getattr(AppearanceType, request.args.get('type')))

    if request.args.get('quotedContentId'):
        query = query.filter_by(quotedContentId=dehumanize(request.args.get('quotedContentId')))

    return listify(Appearance,
                   includes=APPEARANCE_INCLUDES,
                   page=request.args.get('page', 1),
                   paginate=int(request.args.get('limit', 10)),
                   query=query)


@app.route('/appearances/<appearance_id>', methods=['GET'])
def get_appearance(appearance_id):
    appearance = load_or_404(Appearance, appearance_id)
    return jsonify(as_dict(appearance, includes=APPEARANCE_INCLUDES)), 200
