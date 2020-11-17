from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.utils import logger

from models.content import Content
from models.user import User
from models.verdict import Verdict
from utils.config import APP_NAME, COMMAND_NAME,TLD


def create_verdicts():
    logger.info('create_verdicts')

    verdicts = []
    user = User.query.filter_by(email='{}test.editor0@{}.{}'.format(COMMAND_NAME, APP_NAME, TLD)).one()

    content = Content.query.filter_by(url='https://www.breitbart.com/big-government/2017/03/20/delingpole-great-barrier-reef-still-not-dying-whatever-washington-post-says').one()
    verdicts.append(Verdict(
        comment='{"blocks":[{"key":"2l86g","text":"C\'est abusé, voici mon verdict lol","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
        content=content,
        editor=user
    ))

    ApiHandler.save(*verdicts)

    logger.info('created {} verdicts'.format(len(verdicts)))
