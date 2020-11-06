import io
import mimetypes
import requests
from flask_login import current_user
from flask import current_app as app, jsonify, request, send_file
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict

from models.image import Image
from repository.roles import check_user_has_role
from validation.thumbs import check_and_read_files_thumb
from utils.rest import login_or_api_key_required
from storage.thumb import save_thumb


@app.route('/images', methods=['GET'])
def get_image_from_url():
    url = request.args.get('url')
    if not request.args.get('url') or url == 'null':
        return 'url is missing or is not valid', 400
    result = requests.get(url)
    mem = io.BytesIO()
    mem.write(result.content)
    mem.seek(0)
    mimetype = mimetypes.types_map['.{}'.format(url.split('.')[-1])] if '.' in url else 'image/png'
    return send_file(mem, mimetype=mimetype)


@app.route('/images', methods=['POST'])
@login_or_api_key_required
def create_image_from_files():

    check_user_has_role(current_user, 'REVIEWER')

    thumb = check_and_read_files_thumb(request.files)

    image = Image()

    image_dict = {'name': request.files['thumb'].filename}
    image.modify(image_dict)

    ApiHandler.save(image)

    save_thumb(image, thumb, 0)

    return jsonify(as_dict(image)), 201
