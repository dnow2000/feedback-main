from sqlalchemy_api_handler import ApiHandler, logger

from models.article import Article
from models.tag import Tag
from models.verdict import Verdict
from models.verdict_tag import VerdictTag
from models.user import User

def create_verdict_tags():
    logger.info('create_verdict_tags')

    verdict_tags_by_name = {}

    article = Article.query.filter_by(url="http://www.dailymail.co.uk/sciencetech/article-4192182/World-leaders-duped-manipulated-global-warming-data.html").one()
    user = User.query.filter_by(email="sftest.editor.0@sciencefeedback.co").one()
    verdict = Verdict.query.filter_by(
        article=article,
        user=user
    ).one()
    tag = Tag.query.filter_by(text="accurate").one()
    verdict_tags_by_name["Great Barrier / editor 0 / accurate"] = VerdictTag(
        verdict=verdict,
        tag=tag
    )

    ApiHandler.save(*verdict_tags_by_name.values())

    logger.info('created {} verdict_tags_by_name'.format(len(verdict_tags_by_name)))

    return verdict_tags_by_name
