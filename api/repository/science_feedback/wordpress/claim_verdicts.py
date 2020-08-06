from sqlalchemy_api_handler import humanize, logger
from sqlalchemy.exc import IntegrityError, InvalidRequestError
from psycopg2.errors import NotNullViolation
from sqlalchemy_api_handler import ApiHandler

from domain.science_feedback.wordpress.claim_review import claim_review_from_url
from models.tag import Tag, TagType
from models.verdict import Verdict
from models.verdict_tag import VerdictTag
from utils.asynchronous import map_asynchronous


def claim_verdicts_from_airtable(max_verdicts=None):
    query = Verdict.query.filter(Verdict.scienceFeedbackUrl != None)
    if max_verdicts is not None:
        query = query.limit(max_verdicts)

    verdicts = query.all()

    if max_verdicts is not None:
        max_verdicts = len(verdicts)

    urls = [verdict.scienceFeedbackUrl for verdict in verdicts][:max_verdicts]
    claim_reviews = map_asynchronous(claim_review_from_url, urls)

    for (index, verdict) in enumerate(verdicts):
        claim_review = claim_reviews[index]
        if not claim_review:
            continue

        for conclusion in claim_review['conclusions']:
            try:
                tag = Tag.create_or_modify({
                    '__SEARCH_BY__': ['label', 'type'],
                    'label': conclusion,
                    'type': TagType.CONCLUSION
                })
                if tag.id is None:
                    logger.info('Saving tag {}'.format(tag))
                    ApiHandler.save(tag)

                verdict_tag = VerdictTag.create_or_modify({
                    '__SEARCH_BY__': ['tagId', 'verdictId'],
                    'tagId': humanize(tag.id),
                    'verdictId': humanize(verdict.id)
                })
                verdict.verdictTags = verdict.verdictTags + [verdict_tag]

            except IntegrityError as e:
                logger.error('IntegrityError: {}, Conclusion: {}'.format(e, conclusion))
            except InvalidRequestError as e:
                logger.error('InvalidRequestError: {}, Conclusion: {}'.format(e, conclusion))
            except NotNullViolation as violation:
                logger.error('NotNullViolation: {}, Conclusion: {}'.format(violation, conclusion))


    return verdicts
