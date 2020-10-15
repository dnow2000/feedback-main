from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.utils import logger

from models.verdict import Verdict
from repository.science_feedback.wordpress.claim_verdicts import claim_verdicts_from_airtable


def sync():
    logger.info('sync science feedback wordpress data...')
    claim_verdicts = claim_verdicts_from_airtable()
    ApiHandler.save(*claim_verdicts)
    logger.info('sync science feedback wordpress data...Done.')
