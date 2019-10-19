from datetime import datetime, timedelta
from sqlalchemy_api_handler import ApiHandler

from models.article import Article
from models.article_tag import ArticleTag
from models.tag import Tag
from domain.content import get_buzzsumo_content,\
                           get_newspaper_content
from domain.keywords import create_filter_matching_all_keywords_in_any_model, \
                            create_get_filter_matching_ts_query_in_any_model
from repository.activities import filter_by_activity_date_and_verb
from utils.screenshotmachine import capture
from utils.thumbs import save_thumb

article_ts_filter = create_get_filter_matching_ts_query_in_any_model(
    Article,
    Tag
)

def resolve_content_with_url(url, **kwargs):
    buzzsumo_content = get_buzzsumo_content(url, **kwargs)

    if buzzsumo_content:
        article = Article.query\
                         .filter_by(
                             buzzsumoId=buzzsumo_content['buzzsumoId']
                         )\
                         .first()
        if article:
            return article.as_dict()

    newspaper_content = get_newspaper_content(url, **kwargs)
    if newspaper_content is None:
        newspaper_content = {}

    if buzzsumo_content is None:
        buzzsumo_content = {}

    return dict(
        newspaper_content,
        **buzzsumo_content
    )

def update_article(article):
    if article.thumbCount == 0:
        thumb = capture(article.url)
        save_thumb(article, thumb, 0, no_convert=True)

    if article.buzzsumoId:
        buzzsumo_content = get_buzzsumo_content(article.url)
        article.populate_from_dict(buzzsumo_content)

def sync_articles(from_date, to_date):
    articles = filter_by_activity_date_and_verb(
        Article.query,
        from_date=from_date,
        to_date=to_date,
        verb='insert'
    ).all()
    for article in articles:
        update_article(article)
    ApiHandler.save(*articles)

def create_clock_sync_articles(from_date_minutes, to_date_minutes):
    def clock_sync_articles():
        now_date = datetime.utcnow()
        from_date = now_date - timedelta(minutes=from_date_minutes)
        to_date = now_date - timedelta(minutes=to_date_minutes)
        sync_articles(from_date, to_date)
    return clock_sync_articles

def get_articles_keywords_join_query(query):
    query = query.outerjoin(ArticleTag)\
                 .outerjoin(Tag)
    return query

def get_articles_query_with_keywords(query, keywords):
    keywords_filter = create_filter_matching_all_keywords_in_any_model(
        article_ts_filter,
        keywords
    )
    query = query.filter(keywords_filter)
    return query

def filter_articles_by_is_reviewable(query, is_reviewable):
    query = query.filter_by(isReviewable=is_reviewable)
    return query
