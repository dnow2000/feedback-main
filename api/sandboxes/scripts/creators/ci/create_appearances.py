from sqlalchemy_api_handler import ApiHandler, logger

from models.appearance import Appearance, SentimentType
from models.claim import Claim
from models.user import User


def create_appearances():
    appearances = []


    claim = Claim.query.filter_by(text='global warming is caused by solar cycle').one()
    user = User.query.filter_by(email="sftest.testifier0@sciencefeedback.co").one()
    appearances.append(Claim(
      claim=claim,
      sentiment=SentimentType.ENDORSEMENT,
      user=user
    ))

    claim = Claim.query.filter_by(text='clem is the best parapentiste boy').one()
    user = User.query.filter_by(email="sftest.testifier1@sciencefeedback.co").one()
    appearances.append(Claim(
      claim=claim,
      user=user
    ))

    ApiHandler.save(*apperances)

    logger.info('created {} apperances'.format(len(apperances)))

    return apperances
