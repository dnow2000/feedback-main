# https://medium.com/@denisluiz/python-with-google-sheets-service-account-step-by-step-8f74c26ed28e
import json
import os
from googleapiclient.discovery import build
from google.oauth2 import service_account
from sqlalchemy_api_handler import ApiErrors

SCOPES = [
    'https://www.googleapis.com/auth/drive.readonly'
]


def get_credentials_from_service_account_string(service_account_string):

    if service_account_string is None:
        errors = ApiErrors()
        errors.add_error('file', 'Bad google credentials.')
        raise errors

    json_payload = json.loads(service_account_string)
    json_path = '/tmp/client_secret.json'
    with open(json_path, 'w') as outfile:
        json.dump(json_payload, outfile)

    credentials = service_account.Credentials.from_service_account_file(
        json_path,
        scopes=SCOPES
    )

    os.remove(json_path)

    return credentials


def create_google_service(name, service_account_string):
    credentials = get_credentials_from_service_account_string(service_account_string)

    service = build(
        name,
        'v3',
        credentials=credentials,
        cache_discovery=False
    )

    return service
