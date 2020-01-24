from sqlalchemy_api_handler import as_dict

from utils.credentials import PLAIN_DEFAULT_TESTING_PASSWORD
from utils.config import COMMAND_NAME, EMAIL_HOST

def get_email(first_name, last_name, domain):
    return "{}.{}@{}".format(
        first_name.replace(' ', '').strip().lower(),
        last_name.replace(' ', '').strip().lower(),
        domain
    )

def get_sandbox_role_email(role_type, index=0):
    email = "{}test.{}.{}@{}".format(COMMAND_NAME, role_type, index, EMAIL_HOST)
    return email

def get_password_from_email(email):
    chunks = email.split('.')

    first_chunk_with_at_least_one_number = chunks[0].lower()
    if not first_chunk_with_at_least_one_number[-1].isdigit():
        first_chunk_with_at_least_one_number += '0'

    second_chunk_with_at_least_one_capital_letter = ".".join(
        [chunks[1].capitalize()] + chunks[2:]
    ).split('@')[0]

    minimal_password = "{}.{}".format(
        first_chunk_with_at_least_one_number,
        second_chunk_with_at_least_one_capital_letter
    )
    if len(minimal_password) < 8:
        minimal_password += ''.join(['x'])*(8-len(minimal_password))
    return minimal_password

def get_user_helper(user):
    return dict(
        as_dict(user), **{
            "password": PLAIN_DEFAULT_TESTING_PASSWORD
        }
    )


def pick_one(elements, pick_modulo):
    return elements[pick_modulo % len(elements)]

def pick_every(elements, pick_modulo):
    # we keep len(elements) / modulo
    return list(elements)[::pick_modulo]


def remove_every(elements, remove_modulo):
    # we keep (remove_modulo - 1) / remove_modulo of len(elements)
    return [
        element
        for (index, element) in enumerate(elements)
        if index%remove_modulo
    ]
