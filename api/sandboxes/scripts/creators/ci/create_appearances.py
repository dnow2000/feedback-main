from sqlalchemy_api_handler import ApiHandler, logger

from models.appearance import Appearance, SentimentType
from models.claim import Claim
from models.user import User
from utils.config import APP_NAME, COMMAND_NAME, TLD


def create_appearances():
    appearances = []


    claim = Claim.query.filter_by(text='global warming is caused by solar cycle').one()
    user = User.query.filter_by(email="{}test.testifier0@{}.{}".format(COMMAND_NAME, APP_NAME, TLD)).one()
    appearances.append(Claim(
      claim=claim,
      sentiment=SentimentType.ENDORSEMENT,
      user=user
    ))

    claim = Claim.query.filter_by(text='clem is the best parapentiste boy').one()
    user = User.query.filter_by(email="{}test.testifier1@{}.{}".format(COMMAND_NAME, APP_NAME, TLD)).one()
    appearances.append(Claim(
      claim=claim,
      user=user
    ))

    ApiHandler.save(*appearances)

    logger.info('created {} appearances'.format(len(appearances)))

    return appearances
