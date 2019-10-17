from sqlalchemy_api_handler import ApiHandler, logger

from models.article import Article
from models.tag import Tag
from tests.utils.creators.create_article_tag import create_article_tag

def create_article_tags():
    logger.info('create_article_tags')

    article_tags_by_name = {}

    article = Article.query.filter_by(url="https://www.breitbart.com/big-government/2017/03/20/delingpole-great-barrier-reef-still-not-dying-whatever-washington-post-says").one()
    tag = Tag.query.filter_by(text="climate").one()
    article_tags_by_name["Great Barrier / climate"] = create_article_tag(
        article=article,
        tag=tag
    )

    article = Article.query.filter_by(url="http://www.dailymail.co.uk/sciencetech/article-4192182/World-leaders-duped-manipulated-global-warming-data.html").one()
    tag = Tag.query.filter_by(text="climate").one()
    article_tags_by_name["Daily Mail inflates disagreement / climate"] = create_article_tag(
        article=article,
        tag=tag
    )


    article = Article.query.filter_by(url="https://www.washingtonpost.com/news/energy-environment/wp/2017/02/15/its-official-the-oceans-are-losing-oxygen-posing-growing-threats-to-marine-life").one()
    tag = Tag.query.filter_by(text="climate").one()
    article_tags_by_name["Decline in the amount of dissolved oxygen / climate"] = create_article_tag(
        article=article,
        tag=tag
    )

    article = Article.query.filter_by(url="https://www.lemonde.fr/sciences/article/2018/07/24/maladie-de-lyme-fronde-contre-la-haute-autorite-de-sante_5335369_1650684.html").one()
    tag = Tag.query.filter_by(text="health").one()
    article_tags_by_name["Infection bactérienne / health"] = create_article_tag(
        article=article,
        tag=tag
    )

    article = Article.query.filter_by(url="https://www.earth-syst-sci-data.net/7/47/2015/essd-7-47-2015.html").one()
    tag = Tag.query.filter_by(text="climate").one()
    article_tags_by_name["Global carbon budget 2014 / health"] = create_article_tag(
        article=article,
        tag=tag
    )

    ApiHandler.save(*article_tags_by_name.values())

    logger.info('created {} article_tags_by_name'.format(len(article_tags_by_name)))

    return article_tags_by_name
