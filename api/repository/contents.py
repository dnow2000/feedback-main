from datetime import datetime, timedelta
from sqlalchemy_api_handler import ApiHandler, as_dict, logger

from models.content import Content
from models.content_tag import ContentTag
from models.tag import Tag

from domain.content import newspaper_from_url
from domain.keywords import create_filter_matching_all_keywords_in_any_model, \
                            create_get_filter_matching_ts_query_in_any_model
from domain.trendings.buzzsumo import buzzsumo_trending_from_url
from repository.activities import filter_by_activity_date_and_verb
from utils.screenshotmachine import capture
from utils.wayback_machine import url_from_archive_services
from storage.thumb import save_thumb


CONTENT_TS_FILTER = create_get_filter_matching_ts_query_in_any_model(Content,
                                                                     Tag)


def content_from_url(url, **kwargs):
    content = Content.create_or_modify({
        '__SEARCH_BY__': 'url',
        'url': url
    })

    trending = buzzsumo_trending_from_url(url, **kwargs)
    if trending:
        return content.modify(trending)

    if url:
        newspaper = newspaper_from_url(url, **kwargs)
        if newspaper:
            return content.modify(newspaper)

    content.urlNotFound = True
    return content


def get_contents_keywords_join_query(query):
    query = query.outerjoin(ContentTag)\
                 .outerjoin(Tag)
    return query


def keep_contents_with_keywords(query, keywords):
    keywords_filter = create_filter_matching_all_keywords_in_any_model(CONTENT_TS_FILTER,
                                                                       keywords)
    query = query.filter(keywords_filter)
    return query


def keep_contents_with_minimal_datum(query):
    return query.filter((Content.title is not None) & \
                        ((Content.externalThumbUrl is not None) | (Content.thumbCount > 0)))


def filter_contents_by_is_reviewable(query, is_reviewable):
    query = query.filter_by(isReviewable=is_reviewable)
    return query


def sync_content(content, session=None):
    content = content_from_url(content.url)
    if content.url:
        if not content.externalThumbUrl and content.thumbCount == 0:
            thumb = capture(content.url)
            save_thumb(content, thumb, 0, convert=False)
        if not content.archiveUrl:
            content.archiveUrl = url_from_archive_services(content.url)
    ApiHandler.save(content)
    return content


def sync(from_date=None,
         to_date=None,
         contents_max=None):
    now_date = datetime.utcnow()
    if from_date is None:
        from_date = now_date - timedelta(minutes=100)
    if to_date is None:
        to_date = now_date - timedelta(minutes=0)

    query = Content.query

    if from_date or to_date:
        query = filter_by_activity_date_and_verb(query,
                                                 from_date=from_date,
                                                 to_date=to_date,
                                                 verb='insert')

    contents = query.all()

    if contents_max is None:
        contents_max = len(contents)

    logger.info('Sync contents from {} to {}...'.format(from_date, to_date))
    for content in contents[:contents_max]:
        sync_content(content)
        logger.info('Synced content: {}'.format(as_dict(content)))

    logger.info('Sync contents from {} to {}...Done'.format(from_date, to_date))
