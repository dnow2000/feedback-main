from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler, \
                                   as_dict, \
                                   dehumanize, \
                                   load_or_404

from models.appearance import Appearance
from utils.includes import APPEARANCE_INCLUDES
from utils.rest import listify


@app.route('/appearances', methods=['GET'])
def get_appearances():
    query = Appearance.query

    if request.args.get('limit'):
        query = query.limit(request.args.get('limit'))

    ### TODO optimize filter with predefined type AppearanceType.LINK or AppearanceType.INTERACTION
    #if request.args.get('type'):
    #    query = query.filter_by(type=getattr(AppearanceType, request.args.get('type')))


    if request.args.get('quotedContentId'):
        query = query.filter_by(quotedContentId=dehumanize(request.args.get('quotedContentId')))

    return listify(Appearance, query=query)


@app.route('/appearances/<appearance_id>', methods=['GET'])
def get_appearance(appearance_id):
    appearance = load_or_404(Appearance, appearance_id)
    return jsonify(as_dict(appearance)), 200

'''
@app.route('/appearances/<appearance_id>/interactions', methods=['GET'])
def get_appearance_shares(appearance_id):
    appearance = load_or_404(Appearance, appearance_id)
    content = appearance.quotingContent
    query = content.quotedFromAppearances

    sharing_apps = query.all()
    sharing_contents = [app.quotingContent for app in sharing_apps]
    interactions = [{'post': as_dict(content), 'medium': as_dict(content.medium)} for content in sharing_contents]
    return jsonify({
        **as_dict(appearance, includes=APPEARANCE_INCLUDES),
        'interactions': interactions
    })
'''
