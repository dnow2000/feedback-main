from sqlalchemy_api_handler import ApiHandler, logger

from models.verdict import Verdict
from repository.science_feedback.wordpress.claim_verdicts import claim_verdicts_from_airtable


def sync():
    logger.info('sync science feedback wordpress data...')
    claim_verdicts = claim_verdicts_from_airtable(max_verdicts=100)
    ApiHandler.save(*claim_verdicts)
    logger.info('sync science feedback wordpress data...')
