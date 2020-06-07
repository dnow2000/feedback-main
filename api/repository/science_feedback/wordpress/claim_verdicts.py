from domain.science_feedback.wordpress.claim_review import claim_review_from_url
from models.verdicts import Verdict


def claim_verdicts_from_airtable():
    verdicts = Verdict.query.filter(Verdict.scienceFeedbackUrl != None).all()
    for verdict in verdicts:
        claim_review = claim_review_from_url(verdict.scienceFeedbackUrl)
        print(claim_review)
    return verdicts
