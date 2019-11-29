from flask_login import current_user, login_required, logout_user, login_user
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler, as_dict

from models.publication import Publication
from models.user import User
from routes.utils.includes import USER_INCLUDES
from utils.credentials import get_user_with_credentials
from utils.login_manager import stamp_session, discard_session
from storage.thumb import get_crop, read_thumb, save_thumb
from validation.thumbs import check_thumb_in_request, \
                              check_thumb_quality

@app.route("/users/current", methods=["GET"])
@login_required
def get_current_user():
    return jsonify(as_dict(current_user, includes=USER_INCLUDES))

@app.route("/users/signin", methods=["POST"])
def signin():
    json = request.get_json()
    identifier = json.get("identifier")
    password = json.get("password")
    user = get_user_with_credentials(identifier, password)
    login_user(user, remember=True)
    stamp_session(user)
    return jsonify(as_dict(user, includes=USER_INCLUDES)), 200

@app.route("/users/signout", methods=["GET"])
@login_required
def signout():
    discard_session()
    logout_user()
    return jsonify({"global": "Disconnected"})

@app.route("/users/signup", methods=["POST"])
def signup():
    check_thumb_in_request(files=request.files, form=request.form)

    user_dict = dict({}, **request.form)
    if 'picture' in user_dict:
        del user_dict['picture']

    publications = []
    for index in [1, 2, 3]:
        publication_key = 'publication-{}'.format(index)
        if publication_key in request.form:
            publication_url = request.form[publication_key]
            publication = Publication.query.filter_by(url=publication_url).first()
            if not publication:
                publication = Publication(url=publication_url)
                publications.append(publication)

    thumb = read_thumb(files=request.files, form=request.form)
    check_thumb_quality(thumb)
    new_user = User(**user_dict)
    ApiHandler.save(new_user, *publications)
    save_thumb(new_user, thumb, 0, crop=get_crop(request.form))

    login_user(new_user)
    stamp_session(new_user)
    return jsonify(as_dict(new_user, includes=USER_INCLUDES)), 201
