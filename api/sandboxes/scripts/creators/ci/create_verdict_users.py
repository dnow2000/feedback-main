from sqlalchemy_api_handler import ApiHandler, logger

from models.article import Article
from models.verdict import Verdict
from models.verdict_user import VerdictUser
from models.user import User

def create_verdict_users():
    logger.info('create_verdict_users')

    verdict_users_by_name = {}

    article = Article.query.filter_by(url="https://www.breitbart.com/big-government/2017/03/20/delingpole-great-barrier-reef-still-not-dying-whatever-washington-post-says").one()
    editor_user = User.query.filter_by(email="sftest.editor.0@sciencefeedback.co").one()
    verdict = Verdict.query.filter_by(
        article=article,
        user=editor_user
    ).one()
    reviewer_user = User.query.filter_by(email="sftest.reviewer.0@sciencefeedback.co").one()
    verdict_users_by_name["Great Barrier / reviewer 0"] = VerdictUser(
        verdict=verdict,
        user=reviewer_user
    )

    ApiHandler.save(*verdict_users_by_name.values())

    logger.info('created {} verdict_users_by_name'.format(len(verdict_users_by_name)))

    return verdict_users_by_name
