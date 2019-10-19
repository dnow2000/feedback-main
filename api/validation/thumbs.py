from io import BytesIO
from PIL import Image
from sqlalchemy_api_handler import ApiErrors

ALLOWED_EXTENSIONS = set(['jpg', 'png', 'jpeg', 'gif'])
MINIMUM_FILE_SIZE = 100 * 1000


def check_and_read_files_thumb(files=None):
    if 'thumb' in files:
        thumb = files['thumb']
        if files['thumb'].filename == '':
            api_errors = ApiErrors()
            api_errors.add_error('thumb', "You need a name for your thumb file")
            raise api_errors
        filename_parts = thumb.filename.rsplit('.', 1)
        if len(filename_parts) < 2 \
           or filename_parts[1].lower() not in ALLOWED_EXTENSIONS:
            api_errors = ApiErrors()
            api_errors.add_error('thumb', "This thumb needs a (.png, .jpg...) like or its format is not authorized")
            raise api_errors
        return thumb.read()

    api_errors = ApiErrors()
    api_errors.add_error('thumb', "You need to provide a thumb in your request")
    raise api_errors


def check_thumb_in_request(files, form):
    missing_image_error = ApiErrors({'thumb': ["Vous devez fournir une image d'accroche"]})

    if 'thumb' in files:
        if files['thumb'].filename == '':
            raise missing_image_error

    elif 'thumbUrl' not in form:
        raise missing_image_error


def check_thumb_quality(thumb: bytes):
    errors = []

    if len(thumb) < MINIMUM_FILE_SIZE:
        errors.append("L'image doit faire 100 ko minimum")

    image = Image.open(BytesIO(thumb))
    if image.width < 400 or image.height < 400:
        errors.append("L'image doit faire 400 * 400 px minimum")

    if len(errors) > 1:
        errors = ["L'image doit faire 100 ko minimum et 400 * 400 px minimum"]

    if errors:
        raise ApiErrors({'thumb': errors})
