from flask_login import current_user
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler, as_dict

from models.image import Image
from validation import check_and_read_files_thumb, \
                       check_has_role
from utils.rest import login_or_api_key_required
from storage.thumb import save_thumb


@app.route('/images', methods=['POST'])
@login_or_api_key_required
def create_image():

    check_has_role(current_user, 'reviewer')

    thumb = check_and_read_files_thumb(request.files)

    image = Image()

    image_dict = { "name": request.files['thumb'].filename }
    image.populate_from_dict(image_dict)

    ApiHandler.save(image)

    save_thumb(image, thumb, 0)

    return jsonify(as_dict(image)), 201
