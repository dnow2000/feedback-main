from flask import current_app as app, jsonify

from domain.wikidata import wikidata_from


@app.route('/wikidata/<name>', methods=['GET'])
def get_wikidata(name):
    return jsonify(wikidata_from(name))
