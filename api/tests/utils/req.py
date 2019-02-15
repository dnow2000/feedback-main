import requests as req

from utils.config import COMMAND_NAME, EMAIL_HOST

API_URL = "http://localhost:5000"

def req_with_auth(email=None, password=None):
    r = req.Session()
    if email is None:
        r.auth = (
            "{}test.master.0@{}".format(COMMAND_NAME, EMAIL_HOST),
            "{}test.Master.0".format(COMMAND_NAME)
        )
    elif password is not None:
        r.auth = (email, password)
    return r

def req_with_test_role(role_type, index=0):
    email = "{}test.{}.{}@{}".format(COMMAND_NAME, role_type, index, EMAIL_HOST)
    password = "{}test.{}.{}".format(COMMAND_NAME, role_type.capitalize(), index)
    return req_with_auth(email, password)
