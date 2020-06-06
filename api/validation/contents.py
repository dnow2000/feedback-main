from sqlalchemy_api_handler import ApiErrors


def check_content_is_not_yet_saved(content):
    if content.id:
        api_errors = ApiErrors()
        api_errors.add_error('global', "You posted an content with an id")
        raise api_errors
