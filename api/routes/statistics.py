from flask import current_app as app, jsonify

from models.content import Content
from models.verdict import Verdict
from repository.statistics import statistic_from_model


@app.route('/statistics', methods=['GET'])
def get_statistics():
    return jsonify(list(map(statistic_from_model, [Content, Verdict])))
