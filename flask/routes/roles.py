from flask_login import current_user
from flask import current_app as app, jsonify

from models.role import RoleType
from utils.rest import login_or_api_key_required
from validation import check_has_role


@app.route('/roleTypes', methods=['GET'])
@login_or_api_key_required
def list_role_types():
    check_has_role(current_user, 'admin')

    role_types = [role_type.asdict() for role_type in RoleType]

    return jsonify(role_types), 200
