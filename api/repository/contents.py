from sqlalchemy_api_handler import ApiHandler

from models.content import Content
from models.content_tag import ContentTag
from models.tag import Tag

from domain.content import  content_from_newspaper_url
from domain.keywords import create_filter_matching_all_keywords_in_any_model, \
                            create_get_filter_matching_ts_query_in_any_model
from domain.trendings.buzzsumo import content_from_buzzsumo_url
from repository.activities import filter_by_activity_date_and_verb
from utils.screenshotmachine import capture
from storage.thumb import save_thumb


content_ts_filter = create_get_filter_matching_ts_query_in_any_model(
    Content,
    Tag
)


def resolve_with_url(url, **kwargs):
    buzzsumo_content = content_from_buzzsumo_url(url, **kwargs)

    if buzzsumo_content:
        content = Content.query\
                         .filter_by(
                             buzzsumoId=buzzsumo_content['buzzsumoId']
                         )\
                         .first()
        if content:
            return content.as_dict()

    newspaper_content = content_from_newspaper_url(url, **kwargs)
    if newspaper_content is None:
        newspaper_content = {}

    if buzzsumo_content is None:
        buzzsumo_content = {}

    return dict(
        newspaper_content,
        **buzzsumo_content
    )


def get_contents_keywords_join_query(query):
    query = query.outerjoin(ContentTag)\
                 .outerjoin(Tag)
    return query


def get_contents_query_with_keywords(query, keywords):
    keywords_filter = create_filter_matching_all_keywords_in_any_model(
        content_ts_filter,
        keywords
    )
    query = query.filter(keywords_filter)
    return query


def filter_contents_by_is_reviewable(query, is_reviewable):
    query = query.filter_by(isReviewable=is_reviewable)
    return query


def sync_content(content):
    if content.thumbCount == 0:
        thumb = capture(content.url)
        save_thumb(content, thumb, 0, convert=False)

    if content.buzzsumoId:
        buzzsumo_content = content_from_buzzsumo_url(content.url)
        content.modify(buzzsumo_content)


def sync(from_date, to_date):
    contents = filter_by_activity_date_and_verb(
        Content.query,
        from_date=from_date,
        to_date=to_date,
        verb='insert'
    ).all()
    for content in contents:
        sync_content(content)
    ApiHandler.save(*contents)
