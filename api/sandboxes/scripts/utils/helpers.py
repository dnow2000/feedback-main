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
    return dict(user.as_dict(), **{
        "password": get_password_from_email(user.email)
    })
