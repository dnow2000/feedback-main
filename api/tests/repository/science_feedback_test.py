import pytest
from sqlalchemy_api_handler import ApiHandler

from models.article import Article
from models.claim import Claim
from models.user import User
from repository.science_feedback import sync_all
from tests.utils.clean import with_clean_all_database


@pytest.mark.standalone
@with_clean_all_database
def when_sync_all_is_a_success(app):
    # when
    sync_all()

    # then
    articles = Article.query.all()
    assert len(articles) == 1
