import simplejson as json
from flask import current_app as app, jsonify
from sqlalchemy_api_handler import ApiErrors, logger
from sqlalchemy_api_handler.api_errors import ResourceGoneError

@app.errorhandler(ApiErrors)
def restize_api_errors(e):
    print(json.dumps(e.errors))
    return jsonify(e.errors), e.status_code or 400


@app.errorhandler(ResourceGoneError)
def restize_resource_gone_error(e):
    logger.error(json.dumps(e.errors))
    return jsonify(e.errors), e.status_code or 410
