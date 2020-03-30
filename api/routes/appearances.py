from flask import current_app as app, jsonify
from sqlalchemy_api_handler import ApiHandler, \
                                   as_dict, \
                                   load_or_404

from models.appearance import Appearance
from utils.rest import listify


@app.route('/appearances', methods=['GET'])
def get_appearances():
    query = Appearance.query
    return listify(Appearance, query=query)


@app.route('/appearances/<appearance_id>', methods=['GET'])
def get_appearance(appearance_id):
    appearance = load_or_404(Appearance, appearance_id)
    return jsonify(as_dict(appearance)), 200
