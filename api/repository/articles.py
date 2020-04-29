from sqlalchemy_api_handler import ApiHandler

from models.article import Article
from models.article_tag import ArticleTag
from models.tag import Tag

from domain.article import  article_from_newspaper_url
from domain.keywords import create_filter_matching_all_keywords_in_any_model, \
                            create_get_filter_matching_ts_query_in_any_model
from domain.trendings.buzzsumo import article_from_buzzsumo_url
from repository.activities import filter_by_activity_date_and_verb
from utils.screenshotmachine import capture
from storage.thumb import save_thumb

article_ts_filter = create_get_filter_matching_ts_query_in_any_model(
    Article,
    Tag
)


def resolve_with_url(url, **kwargs):
    buzzsumo_article = article_from_buzzsumo_url(url, **kwargs)

    if buzzsumo_article:
        article = Article.query\
                         .filter_by(
                             buzzsumoId=buzzsumo_article['buzzsumoId']
                         )\
                         .first()
        if article:
            return article.as_dict()

    newspaper_article = article_from_newspaper_url(url, **kwargs)
    if newspaper_article is None:
        newspaper_article = {}

    if buzzsumo_article is None:
        buzzsumo_article = {}

    return dict(
        newspaper_article,
        **buzzsumo_article
    )


def update_article(article):
    if article.thumbCount == 0:
        thumb = capture(article.url)
        save_thumb(article, thumb, 0, convert=False)

    if article.buzzsumoId:
        buzzsumo_content = article_from_buzzsumo_url(article.url)
        article.modify(buzzsumo_content)


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
