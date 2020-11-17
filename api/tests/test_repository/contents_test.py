# pylint: disable=W0613

import pytest
from sqlalchemy_api_handler import ApiHandler

from models.content import Content
from models.content_tag import ContentTag
from models.tag import Tag
from repository.contents import keep_contents_with_keywords, \
                                get_contents_keywords_join_query
from tests.decorators import with_delete


def filter_contents_with_keywords(keywords):
    query = get_contents_keywords_join_query(Content.query)
    query = keep_contents_with_keywords(query, keywords)
    return query


@pytest.mark.standalone
@with_delete
def when_get_contents_with_one_complete_keyword_returns_result(app):
    # given
    content1 = Content(
        url="http://content1.com",
        authors=None,
        summary=None,
        tags=None,
        title="Can hipster-neo-farmers save the world ?"
    )
    content2 = Content(
        url="http://content2.com",
        authors=None,
        summary=None,
        tags=None,
        title="Do we have enough quinoa for all the children ?"
    )

    ApiHandler.save(content1, content2)

    # when
    contents = filter_contents_with_keywords('hipster').all()

    # then
    assert len(contents) == 1
    assert content1 in contents

@pytest.mark.standalone
@with_delete
def when_get_contents_with_one_truncated_keyword_returns_result(app):
    # given
    content1 = Content(
        url="http://content1.com",
        authors=None,
        summary=None,
        tags=None,
        title="Can hipster-neo-farmers save the world ?"
    )
    content2 = Content(
        url="http://content2.com",
        authors=None,
        summary=None,
        tags=None,
        title="Do we have enough quinoa for all the children ?"
    )

    ApiHandler.save(content1, content2)

    # when
    contents = filter_contents_with_keywords('hip').all()

    # then
    assert len(contents) == 1
    assert content1 in contents

@pytest.mark.standalone
@with_delete
def when_get_contents_with_one_close_around_keyword_returns_result(app):
    # given
    content1 = Content(
        url="http://content1.com",
        authors=None,
        summary=None,
        tags=None,
        title="Can hipster-neo-farmers save the world ?"
    )
    content2 = Content(
        url="http://content2.com",
        authors=None,
        summary=None,
        tags=None,
        title="Do we have enough quinoa for all the children ?"
    )

    ApiHandler.save(content1, content2)

    # when
    contents = filter_contents_with_keywords('hipsters').all()

    # then
    assert len(contents) == 1
    assert content1 in contents

@pytest.mark.standalone
@with_delete
def when_get_contents_with_one_far_around_keyword_returns_no_result(app):
    # given
    content1 = Content(
        url="http://content1.com",
        authors=None,
        summary=None,
        tags=None,
        title="Can hipster-neo-farmers save the world ?"
    )
    content2 = Content(
        url="http://content2.com",
        authors=None,
        summary=None,
        tags=None,
        title="Do we have enough quinoa for all the children ?"
    )

    ApiHandler.save(content1, content2)

    # when
    contents = filter_contents_with_keywords('hipsterssss').all()

    # then
    assert len(contents) == 0

@pytest.mark.standalone
@with_delete
def when_get_contents_with_several_around_keywords_returns_result(app):
    # given
    content1 = Content(
        url="http://content1.com",
        authors=None,
        summary=None,
        tags=None,
        title="Can hipster-neo-farmers save the world ?"
    )
    content2 = Content(
        url="http://content2.com",
        authors=None,
        summary=None,
        tags=None,
        title="Do we have enough quinoa for all the children ?"
    )

    ApiHandler.save(content1, content2)

    # when
    contents = filter_contents_with_keywords('save wor').all()

    # then
    assert len(contents) == 1
    assert content1 in contents

@pytest.mark.standalone
@with_delete
def when_get_contents_with_keyword_tag_returns_result(app):
    # given
    content1 = Content(
        url="http://content1.com",
        authors=None,
        summary=None,
        tags=None,
        title="Can hipster-neo-farmers save the world ?"
    )
    content2 = Content(
        url="http://content2.com",
        authors=None,
        summary=None,
        tags=None,
        title="Do we have enough quinoa for all the children ?"
    )
    tag1 = Tag(label="Climate")
    content_tag1 = ContentTag(
        content=content1,
        tag=tag1
    )

    ApiHandler.save(content1, content2, content_tag1)

    # when
    contents = filter_contents_with_keywords('clim').all()

    # then
    assert len(contents) == 1
    assert content1 in contents
