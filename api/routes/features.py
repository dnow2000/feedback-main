from flask import current_app as app, jsonify
from sqlalchemy_api_handler.serialization import as_dict

from models.feature import Feature


@app.route('/features', methods=['GET'])
def list_features():
    features = Feature.query.all()
    return jsonify([as_dict(feature) for feature in features]), 200
