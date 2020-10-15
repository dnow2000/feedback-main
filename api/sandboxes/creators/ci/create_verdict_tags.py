from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.utils import logger

from models.content import Content
from models.tag import Tag, TagType
from models.verdict import Verdict
from models.verdict_tag import VerdictTag
from models.user import User
from utils.config import APP_NAME, COMMAND_NAME, TLD


def create_verdict_tags():
    logger.info('create_verdict_tags')

    verdict_tags = []

    content = Content.query.filter_by(url='https://www.breitbart.com/big-government/2017/03/20/delingpole-great-barrier-reef-still-not-dying-whatever-washington-post-says').one()
    editor = User.query.filter_by(email='{}test.editor0@{}.{}'.format(COMMAND_NAME, APP_NAME, TLD)).one()
    verdict = Verdict.query.filter_by(
        content=content,
        editor=editor
    ).one()
    tag = Tag.query.filter_by(
        label='Inaccurate',
        type=TagType.CONCLUSION
    ).one()
    verdict_tags.append(VerdictTag(
        verdict=verdict,
        tag=tag
    ))

    ApiHandler.save(*verdict_tags)

    logger.info('created {} verdict_tags_by_name'.format(len(verdict_tags)))
