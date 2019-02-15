import pytest

from sandboxes.scripts.creators.ci import create_articles,\
                                          create_evaluations, \
                                          create_reviews, \
                                          create_roles, \
                                          create_users
from tests.conftest import clean_all_database
from tests.utils.req import API_URL, req_with_test_role
from utils.logger import deactivate_logger

@pytest.mark.standalone
@clean_all_database
def test_get_reviews_should_work_only_when_editor(app):
    create_users()
    create_roles()
    r = req_with_test_role("user").get(API_URL + '/reviews')
    assert r.status_code == 400
    r = req_with_test_role("admin").get(API_URL + '/reviews')
    assert r.status_code == 400
    r = req_with_test_role("reviewer").get(API_URL + '/reviews')
    assert r.status_code == 400
    r = req_with_test_role("editor").get(API_URL + '/reviews')
    assert r.status_code == 200
    r = req_with_test_role("master").get(API_URL + '/reviews')
    assert r.status_code == 200

@pytest.mark.standalone
@clean_all_database
def test_get_reviews_should_return_a_list_of_reviews(app):
    deactivate_logger('info')
    create_users()
    create_roles()
    create_articles()
    create_evaluations()
    create_reviews()
    r = req_with_test_role("editor").get(API_URL + '/reviews')
    assert r.status_code == 200
    reviews = r.json()
    assert len(reviews) == 3
