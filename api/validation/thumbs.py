from io import BytesIO
from PIL import Image
from sqlalchemy_api_handler import ApiErrors

ALLOWED_EXTENSIONS = set(['jpg', 'png', 'jpeg', 'gif'])
MINIMUM_FILE_SIZE = 10 * 1000
MINIMUM_HEIGHT_SIZE = 200
MINIMUM_WIDTH_SIZE = 200



def check_and_read_files_thumb(files=None):
    if 'thumb' in files:
        thumb = files['thumb']
        if files['thumb'].filename == '':
            api_errors = ApiErrors()
            api_errors.add_error('thumb', 'You need a name for your thumb file')
            raise api_errors
        filename_parts = thumb.filename.rsplit('.', 1)
        if len(filename_parts) < 2 \
           or filename_parts[1].lower() not in ALLOWED_EXTENSIONS:
            api_errors = ApiErrors()
            api_errors.add_error('thumb', 'This thumb needs a (.png, .jpg...) like or its format is not authorized')
            raise api_errors
        return thumb.read()

    api_errors = ApiErrors()
    api_errors.add_error('thumb', 'You need to provide a thumb in your request')
    raise api_errors


def check_thumb_in_request(files, form):
    missing_image_error = ApiErrors({'thumb': ['This field is obligatory']})

    if 'thumb' in files:
        if files['thumb'].filename == '':
            raise missing_image_error

    elif 'thumbUrl' not in form:
        raise missing_image_error


def check_thumb_quality(thumb: bytes):
    errors = []

    if len(thumb) < MINIMUM_FILE_SIZE:
        errors.append('Picture must have a minimal size of {} ko.'.format(MINIMUM_FILE_SIZE))

    image = Image.open(BytesIO(thumb))
    print(image.width, image.height)
    if image.width < MINIMUM_HEIGHT_SIZE or image.height < MINIMUM_WIDTH_SIZE:
        errors.append('Picture must be at least {} * {} px.'.format(
            MINIMUM_WIDTH_SIZE,
            MINIMUM_HEIGHT_SIZE
        ))

    if len(errors) > 1:
        errors = ['Picture must have a minimal size of {} ko and at least {} * {} px.'.format(
            MINIMUM_FILE_SIZE,
            MINIMUM_WIDTH_SIZE,
            MINIMUM_HEIGHT_SIZE
        )]

    if errors:
        raise ApiErrors({'thumb': errors})
