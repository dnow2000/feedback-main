from sqlalchemy_api_handler import ApiHandler, logger

from models.content import Content
from models.verdict import Verdict
from models.verdict_reviewer import VerdictReviewer
from models.user import User
from utils.config import APP_NAME, COMMAND_NAME, TLD


def create_verdict_reviewers():
    logger.info('create_verdict_reviewers')

    verdict_reviewers = []

    content = Content.query.filter_by(url="https://www.breitbart.com/big-government/2017/03/20/delingpole-great-barrier-reef-still-not-dying-whatever-washington-post-says").one()
    editor = User.query.filter_by(email="{}test.editor0@{}.{}".format(COMMAND_NAME, APP_NAME, TLD)).one()
    verdict = Verdict.query.filter_by(
        content=content,
        editor=editor
    ).one()
    reviewer = User.query.filter_by(email="{}test.reviewer0@{}.{}".format(COMMAND_NAME, APP_NAME, TLD)).one()
    verdict_reviewers.append(VerdictReviewer(
        verdict=verdict,
        reviewer=reviewer
    ))

    ApiHandler.save(*verdict_reviewers)

    logger.info('created {} verdict_users_by_name'.format(len(verdict_reviewers)))
