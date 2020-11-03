from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.utils import logger

from models.link import Link, LinkType, LinkSubType, StanceType
from models.claim import Claim
from models.content import Content
from models.user import User
from utils.config import APP_NAME, COMMAND_NAME, TLD


def create_links():
    links = []

    claim = Claim.query.filter_by(text='global warming is caused by solar cycle').one()
    content = Content.query.filter_by(title='Daily Mail inflates disagreement between scientists about data handling to make unsupported accusation of data manipulation').one()
    testifier = User.query.filter_by(email="{}test.testifier0@{}.{}".format(COMMAND_NAME, APP_NAME, TLD)).one()
    links.append(Link(
        linkedClaim=claim,
        linkingContent=content,
        stance=StanceType.ENDORSEMENT,
        subType=LinkSubType.QUOTATION,
        testifier=testifier,
        type=LinkType.APPEARANCE
    ))

    claim = Claim.query.filter_by(text='clem is the best parapentiste boy').one()
    content = Content.query.filter_by(title='Cocorico, Fred Poulet revient à la chanson').one()
    testifier = User.query.filter_by(email="{}test.testifier1@{}.{}".format(COMMAND_NAME, APP_NAME, TLD)).one()
    links.append(Link(
        linkedClaim=claim,
        linkingContent=content,
        subType=LinkSubType.QUOTATION,
        testifier=testifier,
        type=LinkType.APPEARANCE
    ))

    ApiHandler.save(*links)

    logger.info('created {} links'.format(len(links)))

    return links
