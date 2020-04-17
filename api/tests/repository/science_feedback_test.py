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
    # given
    max_records = 5

    # when
    sync_all(max_records=max_records)

    # then
    for model in [User, Article, Claim]:
        assert len(model.query.all()) == max_records
