import pytest

from sandboxes.scripts.creators.ci import create_articles, \
                                          create_users
from tests.conftest import clean_all_database
from tests.utils.req import API_URL, req, req_with_auth
from utils.logger import deactivate_logger

@pytest.mark.standalone
@clean_all_database
def test_get_articles_should_work_only_when_logged_in(app):
    # when
    result = req.get(API_URL + '/articles')

    # then
    assert result.status_code == 403

@pytest.mark.standalone
@clean_all_database
def test_get_articles_should_return_a_list_of_articles(app):
    # given
    deactivate_logger('info')
    create_users()
    create_articles()

    # when
    result = req_with_auth().get(API_URL + '/articles')

    # then
    assert result.status_code == 200
    articles = result.json()
    assert len(articles) == 6

@pytest.mark.standalone
@clean_all_database
def test_get_articles_should_return_a_list_of_articles_filter_by_keywords(app):
    # given
    deactivate_logger('info')
    create_users()
    create_articles()

    # when
    result = req_with_auth().get(API_URL + '/articles?keywords=Barrier')

    # then
    assert result.status_code == 200
    articles = result.json()
    assert len(articles) == 1
