from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.utils import logger

from models.content import Content
from models.review import Review
from models.review_tag import ReviewTag
from models.tag import Tag, TagType
from models.user import User
from utils.config import APP_NAME, COMMAND_NAME, TLD


def create_review_tags():
    logger.info('create_review_tags')

    review_tags = []

    content = Content.query.filter_by(url='https://www.breitbart.com/big-government/2017/03/20/delingpole-great-barrier-reef-still-not-dying-whatever-washington-post-says').one()
    reviewer = User.query.filter_by(email='{}test.reviewer0@{}.{}'.format(COMMAND_NAME, APP_NAME, TLD)).one()
    review = Review.query.filter_by(
        content=content,
        reviewer=reviewer
    ).one()
    tag = Tag.query.filter_by(
        label='Accurate',
        type=TagType.QUALIFICATION
    ).one()
    review_tags.append(ReviewTag(
        review=review,
        tag=tag
    ))

    content = Content.query.filter_by(url='http://www.dailymail.co.uk/sciencetech/article-4192182/World-leaders-duped-manipulated-global-warming-data.html').one()
    reviewer = User.query.filter_by(email='{}test.reviewer0@{}.{}'.format(COMMAND_NAME, APP_NAME, TLD)).one()
    review = Review.query.filter_by(
        content=content,
        reviewer=reviewer
    ).one()
    tag = Tag.query.filter_by(
        label='Imprecise / Unclear',
        type=TagType.QUALIFICATION
    ).one()
    review_tags.append(ReviewTag(
        review=review,
        tag=tag
    ))

    content = Content.query.filter_by(url='http://www.dailymail.co.uk/sciencetech/article-4192182/World-leaders-duped-manipulated-global-warming-data.html').one()
    reviewer = User.query.filter_by(email='{}test.reviewer1@{}.{}'.format(COMMAND_NAME, APP_NAME, TLD)).one()
    review = Review.query.filter_by(
        content=content,
        reviewer=reviewer
    ).one()
    tag = Tag.query.filter_by(
        label='Imprecise / Unclear',
        type=TagType.QUALIFICATION
    ).one()
    review_tags.append(ReviewTag(
        review=review,
        tag=tag
    ))

    ApiHandler.save(*review_tags)

    logger.info('created {} review_tags_by_name'.format(len(review_tags)))
