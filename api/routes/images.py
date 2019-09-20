from flask_login import current_user
from flask import current_app as app, jsonify, request
from sqlalchemy_handler import Handler

from models import Image
from validation import check_and_read_files_thumb, \
                       check_has_role
from utils.rest import login_or_api_key_required

@app.route('/images', methods=['POST'])
@login_or_api_key_required
def create_image():

    check_has_role(current_user, 'reviewer')

    thumb = check_and_read_files_thumb(request.files)

    image = Image()

    image_dict = { "name": request.files['thumb'].filename }
    image.populateFromDict(image_dict)

    Handler.save(image)

    image.save_thumb(thumb, 0)

    return jsonify(image.as_dict()), 201
