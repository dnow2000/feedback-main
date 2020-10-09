from flask import current_app as app, jsonify
from sqlalchemy_api_handler import ApiHandler

from repository.checks import check_from_model


@app.route('/checks/<name>', methods=['GET'])
def get_check(name):
    print('NAME')
    database_working, output = check_from_model(ApiHandler.model_from_name(name.title()))
    return_code = 200 if database_working else 500
    return jsonify(output), return_code
