from sqlalchemy_api_handler import ApiHandler, logger

from models.article import Article
from models.evaluation import Evaluation
from models.review import Review
from models.user import User
from utils.config import APP_NAME, COMMAND_NAME, TLD


def create_reviews():
    logger.info('create_reviews')

    reviews = []

    article = Article.query.filter_by(url='https://www.breitbart.com/big-government/2017/03/20/delingpole-great-barrier-reef-still-not-dying-whatever-washington-post-says').one()
    evaluation = Evaluation.query.filter_by(type='article', value=1).one()
    user = User.query.filter_by(email='{}test.reviewer0@{}.{}'.format(COMMAND_NAME, APP_NAME, TLD)).one()
    reviews.append(Review(
        article=article,
        comment='{"blocks":[{"key":"2l86g","text":"C\'est neutre mais pas tout à fait","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        evaluation=evaluation,
        rating=1,
        user=user
    ))


    article = Article.query.filter_by(url='http://www.dailymail.co.uk/sciencetech/article-4192182/World-leaders-duped-manipulated-global-warming-data.html').one()
    evaluation = Evaluation.query.filter_by(type='article', value=-1).one()
    user = User.query.filter_by(email='{}test.reviewer0@{}.{}'.format(COMMAND_NAME, APP_NAME, TLD)).one()
    reviews.append(Review(
        article=article,
        comment='{"blocks":[{"key":"2l86g","text":"C\'est pas très précis","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        evaluation=evaluation,
        rating=-1,
        user=user
    ))

    article = Article.query.filter_by(url='http://www.dailymail.co.uk/sciencetech/article-4192182/World-leaders-duped-manipulated-global-warming-data.html').one()
    evaluation = Evaluation.query.filter_by(type='article', value=-2).one()
    user = User.query.filter_by(email='{}test.reviewer1@{}.{}'.format(COMMAND_NAME, APP_NAME, TLD)).one()
    reviews.append(Review(
        article=article,
        comment='{"blocks":[{"key":"2l86g","text":"On peut dire que c\'est pourri.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        evaluation=evaluation,
        rating=-2,
        user=user
    ))

    ApiHandler.save(*reviews)

    logger.info('created {} reviews'.format(len(reviews)))
