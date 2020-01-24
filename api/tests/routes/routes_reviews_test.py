import pytest

from sandboxes.scripts.creators.ci import create_articles,\
                                          Evaluations, \
                                          Reviews, \
                                          Roles, \
                                          create_users
from sandboxes.scripts.utils.helpers import get_sandbox_role_email
from tests.utils.clean import with_clean_all_database
from tests.utils.TestClient import TestClient
from utils.logger import deactivate_logger

class Get:
    class Returns200:
        @with_clean_all_database
        def when_get_reviews_should_work_only_when_editor(self, app):
            create_users()
            Roles()
            result = TestClient(app.test_client())\
                .with_auth(email=get_sandbox_role_email('editor'))\
                .get('/reviews')
            assert result.status_code == 200
            result = TestClient(app.test_client())\
                .with_auth(email=get_sandbox_role_email('master'))\
                .get('/reviews')
            assert result.status_code == 200

        @with_clean_all_database
        def when_get_reviews_should_return_a_list_of_reviews(self, app):
            deactivate_logger('info')
            create_users()
            Roles()
            create_articles()
            Evaluations()
            Reviews()
            result = TestClient(app.test_client()) \
                .with_auth(email=get_sandbox_role_email('editor')) \
                .get('/reviews')
            assert result.status_code == 200
            reviews = result.json
            assert len(reviews) == 3

    class Returns400:
        @with_clean_all_database
        def test_get_reviews_should_work_only_when_editor(self, app):
            create_users()
            Roles()
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
