from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import humanize, logger
from sqlalchemy.exc import IntegrityError, InvalidRequestError
from psycopg2.errors import NotNullViolation
from sqlalchemy_api_handler import ApiHandler

from domain.science_feedback.wordpress.claim_review import claim_review_from_url



def claim_tags_from_verdict(verdict):
    from models.tag import Tag, TagType
    from models.verdict import Verdict
    from models.verdict_tag import VerdictTag
    
    claim_review = claim_review_from_url(verdict.scienceFeedbackUrl)

    for conclusion in claim_review['conclusions']:
        try:
            tag = Tag.create_or_modify({
                '__SEARCH_BY__': ['label', 'type'],
                'label': conclusion,
                'type': TagType.CONCLUSION
            })
            if tag.id is None:
                logger.info('Saving tag {}'.format(as_dict(tag)))
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

    return [verdictTag.tag for verdictTag in verdict.verdictTags]
