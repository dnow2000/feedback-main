import itertools
import random
import string
from sqlalchemy_api_handler import humanize


def create_random_password(length=12):
    password_characters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(password_characters) for i in range(length))


def create_random_token(length=6):
    token = random.SystemRandom()
    return _tokenify([token.randint(1, 255) for index in range(length // 2)])


def get_all_tokens(length=3):
    return map(
        _tokenify,
        itertools.product(*[range(1, 256) for index in range(length)])
    )


def _tokenify(indexes):
    return "".join([humanize(index) for index in indexes])
