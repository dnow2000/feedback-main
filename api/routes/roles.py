from flask_login import current_user
from flask import current_app as app, jsonify, request

from models.manager import Manager
from models.role import Role, RoleType
from models.user import User
from utils.rest import load_or_404, login_or_api_key_required
from validation import check_has_role


@app.route('/roleTypes', methods=['GET'])
@login_or_api_key_required
def list_roles():
    check_has_role(current_user, 'admin')

    role_types = [role_type.asdict() for role_type in RoleType]

    return jsonify(role_types), 200

@app.route('/roles', methods=['POST'])
@login_or_api_key_required
def post_role():
    check_has_role(current_user, 'admin')

    user = load_or_404(User, request.json['userId'])

    role = Role()
    role.type = request.json['type']
    role.user = user

    Manager.check_and_save(role)

    return jsonify(role.as_dict()), 200

@app.route('/roles/<role_id>', methods=['DELETE'])
@login_or_api_key_required
def delete_role():
    check_has_role(current_user, 'admin')

    role = load_or_404(Role, role_id)

    Manager.delete(role_id)

    db.session.commit()

    return jsonify({"id": role_id}), 201
