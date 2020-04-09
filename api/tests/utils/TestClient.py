from pprint import pprint
from requests import Response
from requests.auth import _basic_auth_str
from flask.testing import FlaskClient

from utils.credentials import PLAIN_DEFAULT_TESTING_PASSWORD


class TestClient:
    WITH_DOC = False
    USER_TEST_ADMIN_EMAIL = "pctest.admin93.0@btmx.fr"
    LOCAL_ORIGIN_HEADER = {'origin': 'http://localhost:3000'}

    def __init__(self, client: FlaskClient):
        self.client = client
        self.auth_header = {}

    def with_auth(self, email: str = None, password: str = PLAIN_DEFAULT_TESTING_PASSWORD):
        self.email = email
        if email is None:
            self.auth_header = {
                'Authorization': _basic_auth_str(TestClient.USER_TEST_ADMIN_EMAIL, password),
            }
        else:
            self.auth_header = {
                'Authorization': _basic_auth_str(email, password),
            }

        return self

    def delete(self, route: str, headers=LOCAL_ORIGIN_HEADER):
        result = self.client.delete(route, headers={**self.auth_header, **headers})
        self._print_spec('DELETE', route, None, result)
        return result

    def get(self, route: str, headers=LOCAL_ORIGIN_HEADER):
        result = self.client.get(route, headers={**self.auth_header, **headers})
        self._print_spec('GET', route, None, result)
        return result

    def post(self, route: str, json: dict = None, form: dict = None, files: dict = None, headers=LOCAL_ORIGIN_HEADER):
        if form or files:
            result = self.client.post(route, data=form if form else files, headers={**self.auth_header, **headers})
        else:
            result = self.client.post(route, json=json, headers={**self.auth_header, **headers})

        self._print_spec('POST', route, json, result)
        return result

    def patch(self, route: str, json: dict = None, headers=LOCAL_ORIGIN_HEADER):
        result = self.client.patch(route, json=json, headers={**self.auth_header, **headers})
        self._print_spec('PATCH', route, json, result)
        return result

    def put(self, route: str, json: dict = None, headers=LOCAL_ORIGIN_HEADER):
        result = self.client.put(route, json=json, headers={**self.auth_header, **headers})
        self._print_spec('PUT', route, json, result)
        return result

    def _print_spec(self, verb: str, route: str, request_body: dict, result: Response):
        if not TestClient.WITH_DOC:
            return

        print('\n===========================================')
        print('%s :: %s' % (verb, route))
        print('STATUS CODE :: %s' % result.status_code)

        if request_body:
            print('REQUEST BODY')
            pprint(request_body)

        if result.data:
            print('RESPONSE BODY')
            pprint(result.json)

        print('===========================================\n')
