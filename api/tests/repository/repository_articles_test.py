import pytest
from sqlalchemy_api_handler import ApiHandler

from models.article import Article
from repository.articles import get_articles_query_with_keywords, \
                                get_articles_keywords_join_query
from tests.utils.clean import with_clean_all_database
from tests.utils.creators.create_article import create_article
from tests.utils.creators.create_article_tag import create_article_tag
from tests.utils.creators.create_tag import create_tag

def filter_articles_with_keywords(keywords):
    query = get_articles_keywords_join_query(Article.query)
    query = get_articles_query_with_keywords(query, keywords)
    return query

@pytest.mark.standalone
@with_clean_all_database
def when_get_articles_with_one_complete_keyword_returns_result(app):
    # given
    article1 = create_article(
        url="http://article1.com",
        authors=None,
        summary=None,
        tags=None,
        title="Can hipster-neo-farmers save the world ?"
    )
    article2 = create_article(
        url="http://article2.com",
        authors=None,
        summary=None,
        tags=None,
        title="Do we have enough quinoa for all the children ?"
    )

    ApiHandler.save(article1, article2)

    # when
    articles = filter_articles_with_keywords('hipster').all()

    # then
    assert len(articles) == 1
    assert article1 in articles

@pytest.mark.standalone
@with_clean_all_database
def when_get_articles_with_one_truncated_keyword_returns_result(app):
    # given
    article1 = create_article(
        url="http://article1.com",
        authors=None,
        summary=None,
        tags=None,
        title="Can hipster-neo-farmers save the world ?"
    )
    article2 = create_article(
        url="http://article2.com",
        authors=None,
        summary=None,
        tags=None,
        title="Do we have enough quinoa for all the children ?"
    )

    ApiHandler.save(article1, article2)

    # when
    articles = filter_articles_with_keywords('hip').all()

    # then
    assert len(articles) == 1
    assert article1 in articles

@pytest.mark.standalone
@with_clean_all_database
def when_get_articles_with_one_close_around_keyword_returns_result(app):
    # given
    article1 = create_article(
        url="http://article1.com",
        authors=None,
        summary=None,
        tags=None,
        title="Can hipster-neo-farmers save the world ?"
    )
    article2 = create_article(
        url="http://article2.com",
        authors=None,
        summary=None,
        tags=None,
        title="Do we have enough quinoa for all the children ?"
    )

    ApiHandler.save(article1, article2)

    # when
    articles = filter_articles_with_keywords('hipsters').all()

    # then
    assert len(articles) == 1
    assert article1 in articles

@pytest.mark.standalone
@with_clean_all_database
def when_get_articles_with_one_far_around_keyword_returns_no_result(app):
    # given
    article1 = create_article(
        url="http://article1.com",
        authors=None,
        summary=None,
        tags=None,
        title="Can hipster-neo-farmers save the world ?"
    )
    article2 = create_article(
        url="http://article2.com",
        authors=None,
        summary=None,
        tags=None,
        title="Do we have enough quinoa for all the children ?"
    )

    ApiHandler.save(article1, article2)

    # when
    articles = filter_articles_with_keywords('hipsterssss').all()

    # then
    assert len(articles) == 0

@pytest.mark.standalone
@with_clean_all_database
def when_get_articles_with_several_around_keywords_returns_result(app):
    # given
    article1 = create_article(
        url="http://article1.com",
        authors=None,
        summary=None,
        tags=None,
        title="Can hipster-neo-farmers save the world ?"
    )
    article2 = create_article(
        url="http://article2.com",
        authors=None,
        summary=None,
        tags=None,
        title="Do we have enough quinoa for all the children ?"
    )

    ApiHandler.save(article1, article2)

    # when
    articles = filter_articles_with_keywords('save wor').all()

    # then
    assert len(articles) == 1
    assert article1 in articles

@pytest.mark.standalone
@with_clean_all_database
def when_get_articles_with_keyword_tag_returns_result(app):
    # given
    article1 = create_article(
        url="http://article1.com",
        authors=None,
        summary=None,
        tags=None,
        title="Can hipster-neo-farmers save the world ?"
    )
    article2 = create_article(
        url="http://article2.com",
        authors=None,
        summary=None,
        tags=None,
        title="Do we have enough quinoa for all the children ?"
    )
    tag1 = create_tag("climate")
    article_tag1 = create_article_tag(article1, tag1)

    ApiHandler.save(article1, article2, article_tag1)

    # when
    articles = filter_articles_with_keywords('clim').all()

    # then
    assert len(articles) == 1
    assert article1 in articles
