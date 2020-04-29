import simplejson as json
import traceback
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiErrors
from sqlalchemy_api_handler.utils.human_ids import  NonDehumanizableId
from sqlalchemy_api_handler.bases.errors import DateTimeCastError, \
                                                DecimalCastError, \
                                                ForbiddenError, \
                                                ResourceGoneError, \
                                                ResourceNotFoundError
from werkzeug.exceptions import NotFound

@app.errorhandler(ApiErrors)
def restize_api_errors(exception):
    print(json.dumps(exception.errors))
    return jsonify([exception.errors]), exception.status_code or 400


@app.errorhandler(DateTimeCastError)
def date_time_cast_error(exception):
    api_errors = ApiErrors()
    app.logger.warning(json.dumps(exception.errors))
    for field in exception.errors.keys():
        api_errors.add_error(field, 'Format de date invalide')
    return jsonify([api_errors.errors]), 400


@app.errorhandler(DecimalCastError)
def decimal_cast_error(exception):
    api_errors = ApiErrors()
    app.logger.warning(json.dumps(error.errors))
    for field in exception.errors.keys():
        api_errors.add_error(field, 'Saisissez un nombre valide')
    return jsonify([api_errors.errors]), 400


@app.errorhandler(500)
@app.errorhandler(Exception)
def internal_error(exception):
    tb = traceback.format_exc()
    oneline_stack = ''.join(tb).replace('\n', ' ### ')
    app.logger.error('500 on %s %s — %s',
                     request.method, request.url, oneline_stack)
    api_errors = ApiErrors()
    api_errors.add_error('global',
               "Il semble que nous ayons des problèmes techniques :("
                + " On répare ça au plus vite.")
    return jsonify([api_errors.errors]), 500


@app.errorhandler(ForbiddenError)
def restize_forbidden_error(exception):
    app.logger.error(json.dumps(exception.errors))
    return jsonify([exception.errors]), 403


@app.errorhandler(NonDehumanizableId)
def invalid_id_for_dehumanize_error(exception):
    api_errors = ApiErrors()
    api_errors.add_error('global', 'La page que vous recherchez n\'existe pas')
    app.logger.error('404 %s' % str(exception))
    return jsonify([api_errors.errors]), 404


@app.errorhandler(NotFound)
def restize_not_found_route_errors(exception):
    api_errors = ApiErrors()
    api_errors.add_error('data', 'Not Found')
    return jsonify([api_errors.errors]), 404


@app.errorhandler(ResourceGoneError)
def restize_resource_gone_error(exception):
    app.logger.error(json.dumps(exception.errors))
    return jsonify([exception.errors]), exception.status_code or 410


@app.errorhandler(ResourceNotFoundError)
def restize_booking_not_found_error(exception):
    app.logger.error(json.dumps(exception.errors))
    return jsonify([exception.errors]), exception.status_code or 404
