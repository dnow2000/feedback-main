import re
import secrets
import string
from datetime import datetime, timedelta
from sqlalchemy_api_handler import ApiErrors

from utils.random_token import create_random_token

RESET_PASSWORD_TOKEN_LENGTH = 10


def check_new_password_validity(user, old_password, new_password):
    errors = ApiErrors()

    if not user.check_password(old_password):
        errors.add_error('oldPassword', 'Your old password is incorrect.')
        raise errors

    if user.check_password(new_password):
        errors.add_error('newPassword', 'You new password is the same as the old one.')
        raise errors


def validate_change_password_request(json):
    errors = ApiErrors()

    if 'oldPassword' not in json:
        errors.add_error('oldPassword', 'Old password is missing.')
        raise errors

    if 'newPassword' not in json:
        errors.add_error('newPassword', 'New password is missing.')
        raise errors


def generate_reset_token(user):
    token = create_random_token(length=RESET_PASSWORD_TOKEN_LENGTH)
    user.reset_passwordToken = token
    user.reset_passwordTokenValidityLimit = datetime.utcnow() + timedelta(hours=24)


def validate_reset_request(request):
    if 'email' not in request.get_json():
        errors = ApiErrors()
        errors.add_error('email', 'Email is missing.')
        raise errors

    if not request.get_json()['email']:
        errors = ApiErrors()
        errors.add_error('email', 'This Email is empty.')
        raise errors


def validate_new_password_request(request):
    if 'token' not in request.get_json():
        errors = ApiErrors()
        errors.add_error('token', 'Your token link is invalid.')
        raise errors

    if 'newPassword' not in request.get_json():
        errors = ApiErrors()
        errors.add_error('newPassword', 'You need to enter a new password.')
        raise errors


def check_reset_token_validity(user):
    if datetime.utcnow() > user.reset_passwordTokenValidityLimit:
        errors = ApiErrors()
        errors.add_error('token',
                        'Votre lien de changement de mot de passe est périmé. Veuillez effecture une nouvelle demande.')
        raise errors


def check_password_strength(field_name, field_value):
    at_least_one_uppercase = '(?=.*?[A-Z])'
    at_least_one_lowercase = '(?=.*?[a-z])'
    at_least_one_digit = '(?=.*?[0-9])'
    min_length = '.{12,}'
    at_least_one_special_char = '(?=.*?[#~|=;:,+><?!@$%^&*_.-])'

    regex = '^' \
            + at_least_one_uppercase \
            + at_least_one_lowercase \
            + at_least_one_digit \
            + at_least_one_special_char \
            + min_length \
            + '$'

    if not re.match(regex, field_value):
        errors = ApiErrors()
        errors.add_error(
            field_name,
            'Le mot de passe doit faire au moins 12 caractères et contenir à minima '
            '1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial parmi _-&?~#|^@=+.$,<>%*!:;'
        )
        raise errors


def _random_alphanum_char():
    return secrets.choice(string.ascii_uppercase + string.digits)
