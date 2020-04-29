from sqlalchemy_api_handler import ApiHandler, logger

from models.article import Article
from models.verdict import Verdict
from models.verdict_user import VerdictUser
from models.user import User
from utils.config import APP_NAME, COMMAND_NAME, TLD


def create_verdict_users():
    logger.info('create_verdict_users')

    verdict_users_by_name = {}

    article = Article.query.filter_by(url="https://www.breitbart.com/big-government/2017/03/20/delingpole-great-barrier-reef-still-not-dying-whatever-washington-post-says").one()
    editor_user = User.query.filter_by(email="{}test.editor0@{}.{}".format(COMMAND_NAME, APP_NAME, TLD)).one()
    verdict = Verdict.query.filter_by(
        article=article,
        user=editor_user
    ).one()
    reviewer_user = User.query.filter_by(email="{}test.reviewer0@{}.{}".format(COMMAND_NAME, APP_NAME, TLD)).one()
    verdict_users_by_name["Great Barrier / reviewer 0"] = VerdictUser(
        verdict=verdict,
        user=reviewer_user
    )

    ApiHandler.save(*verdict_users_by_name.values())

    logger.info('created {} verdict_users_by_name'.format(len(verdict_users_by_name)))

    return verdict_users_by_name
