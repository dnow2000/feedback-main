from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler, \
                                   as_dict, \
                                   load_or_404

from models.appearance import Appearance
from models.verdict import Verdict
from repository.appearances import keep_appearances_from_verdict
from utils.rest import listify


@app.route('/appearances', methods=['GET'])
def get_appearances():
    query = Appearance.query

    if 'verdictId' in request.args:
        verdict = load_or_404(Verdict, request.args['verdictId'])
        query = keep_appearances_from_verdict(query, verdict)

    return listify(Appearance,
                   page=request.args.get('page', 1),
                   paginate=10,
                   query=query,
                   with_total_data_count=True)


@app.route('/appearances/<appearance_id>', methods=['GET'])
def get_appearance(appearance_id):
    appearance = load_or_404(Appearance, appearance_id)
    return jsonify(as_dict(appearance)), 200
