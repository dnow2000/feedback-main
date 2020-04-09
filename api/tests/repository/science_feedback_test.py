import pytest
from sqlalchemy_api_handler import ApiHandler

from models.article import Article
from repository.science_feedback import sync_articles
from tests.utils.clean import with_clean_all_database


@pytest.mark.standalone
@with_clean_all_database
def when_sync_articles_is_a_success(app):
    # when
    sync_articles()

    # then
    articles = Article.query.all()
    assert len(articles) == 1
