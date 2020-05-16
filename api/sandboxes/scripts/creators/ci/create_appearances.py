from sqlalchemy_api_handler import ApiHandler, logger

from models.appearance import Appearance, StanceType
from models.claim import Claim
from models.content import Content
from models.user import User
from utils.config import APP_NAME, COMMAND_NAME, TLD


def create_appearances():
    appearances = []

    claim = Claim.query.filter_by(text='global warming is caused by solar cycle').one()
    content = Content.query.filter_by(title='Daily Mail inflates disagreement between scientists about data handling to make unsupported accusation of data manipulation').one()
    testifier = User.query.filter_by(email="{}test.testifier0@{}.{}".format(COMMAND_NAME, APP_NAME, TLD)).one()
    appearances.append(Appearance(
        claim=claim,
        content=content,
        stance=StanceType.ENDORSEMENT,
        testifier=testifier
    ))

    claim = Claim.query.filter_by(text='clem is the best parapentiste boy').one()
    content = Content.query.filter_by(title='Cocorico, Fred Poulet revient à la chanson').one()
    testifier = User.query.filter_by(email="{}test.testifier1@{}.{}".format(COMMAND_NAME, APP_NAME, TLD)).one()
    appearances.append(Appearance(
        claim=claim,
        content=content,
        testifier=testifier
    ))

    ApiHandler.save(*appearances)

    logger.info('created {} appearances'.format(len(appearances)))

    return appearances
