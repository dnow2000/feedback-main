from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.utils import logger

from models.content import Content
from models.content_tag import ContentTag
from models.tag import Tag


def create_content_tags():
    logger.info('create_content_tags')

    content_tags = []

    content = Content.query.filter_by(url='https://www.breitbart.com/big-government/2017/03/20/delingpole-great-barrier-reef-still-not-dying-whatever-washington-post-says').one()
    tag = Tag.query.filter_by(label='Climate').one()
    content_tags.append(ContentTag(
        content=content,
        tag=tag
    ))

    content = Content.query.filter_by(url='http://www.dailymail.co.uk/sciencetech/article-4192182/World-leaders-duped-manipulated-global-warming-data.html').one()
    tag = Tag.query.filter_by(label='Climate').one()
    content_tags.append(ContentTag(
        content=content,
        tag=tag
    ))


    content = Content.query.filter_by(url='https://www.washingtonpost.com/news/energy-environment/wp/2017/02/15/its-official-the-oceans-are-losing-oxygen-posing-growing-threats-to-marine-life').one()
    tag = Tag.query.filter_by(label='Climate').one()
    content_tags.append(ContentTag(
        content=content,
        tag=tag
    ))

    content = Content.query.filter_by(url='https://www.lemonde.fr/sciences/content/2018/07/24/maladie-de-lyme-fronde-contre-la-haute-autorite-de-sante_5335369_1650684.html').one()
    tag = Tag.query.filter_by(label='Health').one()
    content_tags.append(ContentTag(
        content=content,
        tag=tag
    ))

    content = Content.query.filter_by(url='https://www.earth-syst-sci-data.net/7/47/2015/essd-7-47-2015.html').one()
    tag = Tag.query.filter_by(label='Climate').one()
    content_tags.append(ContentTag(
        content=content,
        tag=tag
    ))

    ApiHandler.save(*content_tags)

    logger.info('created {} content_tags_by_name'.format(len(content_tags)))
