from flask import current_app as app, jsonify
from sqlalchemy_api_handler import as_dict

from models.evaluation import Evaluation
from utils.rest import login_or_api_key_required


@app.route('/evaluations', methods=['GET'])
@login_or_api_key_required
def get_evaluations():
    evaluations = Evaluation.query.all()
    return jsonify([
        as_dict(evaluation)
        for evaluation in evaluations
    ])
