from flask_login import current_user, login_required, logout_user, login_user
from flask import current_app as app, jsonify, request

from models.manager import Manager
from models.user import User
from utils.credentials import get_user_with_credentials
from utils.includes import USER_INCLUDES
from utils.login_manager import stamp_session, discard_session

@app.route("/users/current", methods=["GET"])
@login_required
def get_profile():
    user = current_user.asdict(includes=USER_INCLUDES)
    return jsonify(user)


@app.route("/users/signin", methods=["POST"])
def signin():
    json = request.get_json()
    identifier = json.get("identifier")
    password = json.get("password")
    user = get_user_with_credentials(identifier, password)
    login_user(user, remember=True)
    stamp_session(user)
    return jsonify(user.asdict(includes=USER_INCLUDES)), 200

@app.route("/users/signout", methods=["GET"])
@login_required
def signout():
    discard_session()
    logout_user()
    return jsonify({"global": "Disconnected"})


@app.route("/users/signup", methods=["POST"])
def signup():
    new_user = User(from_dict=request.json)
    new_user.id = None
    Manager.check_and_save(new_user)
    login_user(new_user)
    return jsonify(new_user.asdict(includes=USER_INCLUDES)), 201
