from sqlalchemy_api_handler import ApiHandler, logger

from models.article import Article
from models.tag import Tag
from models.verdict import Verdict
from models.verdict_tag import VerdictTag
from models.user import User
from utils.config import APP_NAME, COMMAND_NAME, TLD


def create_verdict_tags():
    logger.info('create_verdict_tags')

    verdict_tags_by_name = {}

    article = Article.query.filter_by(url="https://www.breitbart.com/big-government/2017/03/20/delingpole-great-barrier-reef-still-not-dying-whatever-washington-post-says").one()
    user = User.query.filter_by(email="{}test.editor0@{}.{}".format(COMMAND_NAME, APP_NAME, TLD)).one()
    verdict = Verdict.query.filter_by(
        article=article,
        user=user
    ).one()
    tag = Tag.query.filter_by(text="inaccurate").one()
    verdict_tags_by_name["Great Barrier / editor 0 / inaccurate"] = VerdictTag(
        verdict=verdict,
        tag=tag
    )

    ApiHandler.save(*verdict_tags_by_name.values())

    logger.info('created {} verdict_tags_by_name'.format(len(verdict_tags_by_name)))

    return verdict_tags_by_name
