import pytest

from sandboxes.creators.ci import create_contents,\
                                  create_reviews, \
                                  create_roles, \
                                  create_users
from sandboxes.helpers import get_sandbox_role_email
from tests.decorators import with_clean
from tests.TestClient import TestClient
from utils.logger import deactivate_logger


class Get:
    class Returns200:
        @with_clean
        def when_get_reviews_should_work_only_when_editor(self, app):
            create_users()
            create_roles()
            result = TestClient(app.test_client())\
                .with_auth(email=get_sandbox_role_email('editor'))\
                .get('/reviews')
            assert result.status_code == 200
            result = TestClient(app.test_client())\
                .with_auth(email=get_sandbox_role_email('master'))\
                .get('/reviews')
            assert result.status_code == 200

        @with_clean
        def when_get_reviews_should_return_a_list_of_reviews(self, app):
            deactivate_logger('info')
            create_users()
            create_roles()
            create_contents()
            create_reviews()
            result = TestClient(app.test_client()) \
                .with_auth(email=get_sandbox_role_email('editor')) \
                .get('/reviews')
            assert result.status_code == 200
            reviews = result.json
            assert len(reviews) == 3

    class Returns400:
        @with_clean
        def test_get_reviews_should_work_only_when_editor(self, app):
            create_users()
            create_roles()
            result = TestClient(app.test_client())\
                .with_auth(email=get_sandbox_role_email('user'))\
                .get('/reviews')
            assert result.status_code == 400
            result = TestClient(app.test_client())\
                .with_auth(email=get_sandbox_role_email('admin'))\
                .get('/reviews')
            assert result.status_code == 400
            result = TestClient(app.test_client())\
                .with_auth(email=get_sandbox_role_email('reviewer'))\
                .get('/reviews')
            assert result.status_code == 400
