from datetime import datetime, timedelta
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.utils import logger

from models.content import Content
from models.content_tag import ContentTag
from models.tag import Tag
from repository.activities import filter_by_activity_date_and_verb
from repository.crowdtangle import share_appearances_from_content
from repository.keywords import create_filter_matching_all_keywords_in_any_model, \
                                create_get_filter_matching_ts_query_in_any_model



CONTENT_TS_FILTER = create_get_filter_matching_ts_query_in_any_model(Content,
                                                                     Tag)

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
    return query.filter((Content.title != None) & \
                        ((Content.externalThumbUrl != None) | (Content.thumbCount > 0)))


def filter_contents_by_is_reviewable(query, is_reviewable):
    query = query.filter_by(isReviewable=is_reviewable)
    return query
