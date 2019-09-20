from flask import current_app as app, jsonify

from models.evaluation import Evaluation
from utils.includes import REVIEW_INCLUDES
from utils.rest import login_or_api_key_required


@app.route('/evaluations', methods=['GET'])
@login_or_api_key_required
def list_evaluations():
    evaluations = Evaluation.query.all()
    return jsonify([
        evaluation.as_dict(includes=REVIEW_INCLUDES)
        for evaluation in evaluations
    ])
