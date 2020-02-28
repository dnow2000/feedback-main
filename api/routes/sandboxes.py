from flask import current_app as app, jsonify
from sqlalchemy_api_handler import ApiErrors

from sandboxes.scripts import getters


@app.route('/sandboxes/<getter_name>', methods=['GET'])
def get_sandbox(getter_name):
    for key in dir(getters):
        module = getattr(getters, key)
        if hasattr(module, getter_name):
            getter = getattr(module, getter_name)
            obj = getter()
            return jsonify(obj)

    errors = ApiErrors()
    errors.add_error(
        'getter',
        'Il n\'existe pas de tel \"{}\" getter pour la sandbox'.format(getter_name)
    )
    raise errors
