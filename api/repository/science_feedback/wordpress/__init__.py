from repository.science_feedback.wordpress.claim_verdicts import claim_verdicts_from_airtable


def sync():
    claim_verdicts = claim_verdicts_from_airtable()
    print(claim_verdicts)
