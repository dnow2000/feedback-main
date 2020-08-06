from flask import current_app as app, jsonify, request
from models.appearance import Appearance
from models.verdict import Verdict


@app.route('/data', methods=['GET'])
def get_data():
    return jsonify({
        'appearanceCount': Appearance.query.count(),
        'verdictCount': Verdict.query.count()
    })
    # TODO: base on the queries, add in the respective counts

