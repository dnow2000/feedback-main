from flask import current_app as app, jsonify
from models.appearance import Appearance
from models.content import Content
from models.verdict import Verdict


@app.route('/db_stats', methods=['GET'])
def get_data():
    return jsonify({
        'contentCount': Content.query.filter(Content.type==None).count(),
        'verdictCount': Verdict.query.count()
    }), 200
    # TODO: base on the queries, add in the respective counts
