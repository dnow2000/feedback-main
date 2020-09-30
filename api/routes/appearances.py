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


@app.route('/appearances/<appearance_id>/shares', methods=['GET'])
def get_appearance_shares(appearance_id):
    appearance = load_or_404(Appearance, appearance_id)
    content = appearance.quotingContent
    sharing_apps = content.quotedFromAppearances
    sharing_contents = [app.quotingContent for app in sharing_apps]
    sharing_media = [content.medium for content in sharing_contents]
    return jsonify({'shares': [as_dict(medium) for medium in sharing_media]})
