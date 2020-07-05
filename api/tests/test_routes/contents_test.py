import pytest
from sqlalchemy_api_handler import logger

from sandboxes.creators.ci import create_contents, \
                                  create_users
from sandboxes.helpers import get_sandbox_role_email
from tests.decorators import with_clean
from tests.TestClient import TestClient
from utils.logger import deactivate_logger


class Get:
    class Returns200:
        @with_clean
        def when_get_contents_should_return_a_list_of_contents(self, app):
            # given
            deactivate_logger('info')
            create_users()
            create_contents()
            auth_request = TestClient(app.test_client())\
                             .with_auth(email=get_sandbox_role_email('master'))

            # when
            result = auth_request.get('/contents')

            # then
            assert result.status_code == 200
            contents = result.json
            assert len(contents) == 6

        @with_clean
        def when_get_contents_should_return_a_list_of_contents_filter_by_keywords(self, app):
            # given
            deactivate_logger('info')
            create_users()
            create_contents()
            auth_request = TestClient(app.test_client())\
                             .with_auth(email=get_sandbox_role_email('master'))

            # when
            result = auth_request.get('/contents?keywords=Barrier')

            # then
            assert result.status_code == 200
            contents = result.json
            assert len(contents) == 1

    class Returns401:
        @with_clean
        def test_get_contents_should_work_only_when_logged_in(self, app):
            # when
            auth_request = TestClient(app.test_client())\
                             .with_auth(email=get_sandbox_role_email('user'))
            result = auth_request.get('/contents')

            # then
            assert result.status_code == 401
