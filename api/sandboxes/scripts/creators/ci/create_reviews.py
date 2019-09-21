from sqlalchemy_api_handler import ApiHandler

from models.article import Article
from models.evaluation import Evaluation
from models.review import Review
from models.user import User
from tests.utils import create_review
from utils.logger import logger

def create_reviews():
    logger.info('create_reviews')

    reviews_by_name = {}

    article = Article.query.filter_by(url="https://www.breitbart.com/big-government/2017/03/20/delingpole-great-barrier-reef-still-not-dying-whatever-washington-post-says").one()
    evaluation = Evaluation.query.filter_by(type="article", value=1).one()
    user = User.query.filter_by(email="sftest.reviewer.0@sciencefeedback.co").one()
    reviews_by_name["Great Barrier / reviewer 0"] = create_review(
        article=article,
        comment="C'est neutre mais pas tout à fait",
        evaluation=evaluation,
        rating=1,
        user=user
    )


    article = Article.query.filter_by(url="http://www.dailymail.co.uk/sciencetech/article-4192182/World-leaders-duped-manipulated-global-warming-data.html").one()
    evaluation = Evaluation.query.filter_by(type="article", value=-1).one()
    user = User.query.filter_by(email="sftest.reviewer.0@sciencefeedback.co").one()
    reviews_by_name["Daily Mail inflates disagreement / reviewer 0"] = create_review(
        article=article,
        comment="C'est pas très précis",
        evaluation=evaluation,
        rating=-1,
        user=user
    )

    article = Article.query.filter_by(url="http://www.dailymail.co.uk/sciencetech/article-4192182/World-leaders-duped-manipulated-global-warming-data.html").one()
    evaluation = Evaluation.query.filter_by(type="article", value=-2).one()
    user = User.query.filter_by(email="sftest.reviewer.1@sciencefeedback.co").one()
    reviews_by_name["Daily Mail inflates disagreement / reviewer 1"] = create_review(
        article=article,
        comment="C'est pas trop trop précis",
        evaluation=evaluation,
        rating=-2,
        user=user
    )

    ApiHandler.save(*reviews_by_name.values())

    logger.info('created {} reviews'.format(len(reviews_by_name)))

    return reviews_by_name
