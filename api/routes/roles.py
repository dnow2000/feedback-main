from flask_login import current_user
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler, as_dict, load_or_404

from models.role import Role, RoleType
from models.user import User
from models.utils.db import db
from utils.rest import login_or_api_key_required
from validation import check_has_role


@app.route('/roleTypes', methods=['GET'])
@login_or_api_key_required
def list_roles():
    check_has_role(current_user, 'admin')

    role_types = [as_dict(role_type) for role_type in RoleType]

    return jsonify(role_types), 200


@app.route('/roles', methods=['POST'])
@login_or_api_key_required
def post_role():
    check_has_role(current_user, 'admin')

    user = load_or_404(User, request.json['userId'])

    role = Role()
    role.type = request.json['type']
    role.user = user

    ApiHandler.save(role)

    return jsonify(as_dict(role)), 200


@app.route('/roles/<role_id>', methods=['DELETE'])
@login_or_api_key_required
def delete_role(role_id):
    check_has_role(current_user, 'admin')

    role = load_or_404(Role, role_id)

    ApiHandler.delete(role)

    db.session.commit()

    return jsonify({"id": role_id}), 201
