from sqlalchemy_api_handler import ApiHandler, logger

from models.article import Article
from models.review import Review
from models.review_tag import ReviewTag
from models.tag import Tag
from models.user import User

def create_review_tags():
    logger.info('create_review_tags')

    review_tags_by_name = {}

    article = Article.query.filter_by(url="https://www.breitbart.com/big-government/2017/03/20/delingpole-great-barrier-reef-still-not-dying-whatever-washington-post-says").one()
    user = User.query.filter_by(email="sftest.reviewer.0@sciencefeedback.co").one()
    review = Review.query.filter_by(
        article=article,
        user=user
    ).one()
    tag = Tag.query.filter_by(text="accurate").one()
    review_tags_by_name["Great Barrier / reviewer 1 / accurate"] = ReviewTag(
        review=review,
        tag=tag
    )

    article = Article.query.filter_by(url="http://www.dailymail.co.uk/sciencetech/article-4192182/World-leaders-duped-manipulated-global-warming-data.html").one()
    user = User.query.filter_by(email="sftest.reviewer.0@sciencefeedback.co").one()
    review = Review.query.filter_by(
        article=article,
        user=user
    ).one()
    tag = Tag.query.filter_by(text="imprecise / unclear").one()
    review_tags_by_name["Daily Mail inflates disagreement / reviewer 0 / imprecise"] = ReviewTag(
        review=review,
        tag=tag
    )

    article = Article.query.filter_by(url="http://www.dailymail.co.uk/sciencetech/article-4192182/World-leaders-duped-manipulated-global-warming-data.html").one()
    user = User.query.filter_by(email="sftest.reviewer.1@sciencefeedback.co").one()
    review = Review.query.filter_by(
        article=article,
        user=user
    ).one()
    tag = Tag.query.filter_by(text="imprecise / unclear").one()
    review_tags_by_name["Daily Mail inflates disagreement / reviewer 1 / imprecise"] = ReviewTag(
        review=review,
        tag=tag
    )

    ApiHandler.save(*review_tags_by_name.values())

    logger.info('created {} review_tags_by_name'.format(len(review_tags_by_name)))

    return review_tags_by_name
