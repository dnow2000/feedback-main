import pytest
from sqlalchemy_api_handler import logger

from sandboxes.scripts.creators.ci import create_articles, \
                                          create_users
from sandboxes.scripts.utils.helpers import get_sandbox_role_email
from tests.utils.clean import with_clean_all_database
from tests.utils.TestClient import TestClient
from utils.logger import deactivate_logger

class Get:
    class Returns200:
        @with_clean_all_database
        def when_get_articles_should_return_a_list_of_articles(self, app):
            # given
            deactivate_logger('info')
            create_users()
            create_articles()
            auth_request = TestClient(app.test_client())\
                             .with_auth(email=get_sandbox_role_email('master'))

            # when
            result = auth_request.get('/articles')

            # then
            assert result.status_code == 200
            articles = result.json
            assert len(articles) == 6

        @with_clean_all_database
        def when_get_articles_should_return_a_list_of_articles_filter_by_keywords(self, app):
            # given
            deactivate_logger('info')
            create_users()
            create_articles()
            auth_request = TestClient(app.test_client())\
                             .with_auth(email=get_sandbox_role_email('master'))

            # when
            result = auth_request.get('/articles?keywords=Barrier')

            # then
            assert result.status_code == 200
            articles = result.json
            assert len(articles) == 1

    class Returns401:
        @with_clean_all_database
        def test_get_articles_should_work_only_when_logged_in(self, app):
            # when
            auth_request = TestClient(app.test_client())\
                             .with_auth(email=get_sandbox_role_email('user'))
            result = auth_request.get('/articles')

            # then
            assert result.status_code == 401
