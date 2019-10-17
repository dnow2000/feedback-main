from sqlalchemy_api_handler import ApiErrors

ALLOWED_EXTENSIONS = set(['jpg', 'png', 'jpeg', 'gif'])

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
