from flask import current_app as app, jsonify
from sqlalchemy_api_handler import ApiHandler

from repository.checks import check_from_model


@app.route('/checks/modelName', methods=['GET'])
def get_check(model_name):
    database_working, output = check_from_model(ApiHandler.model_from_name(model_name))
    return_code = 200 if database_working else 500
    return jsonify(output), return_code
