import os

from utils.airtable import request_airtable_rows


SCIENCE_FEEDBACK_AIRTABLE_BASE_ID = os.environ.get('SCIENCE_FEEDBACK_AIRTABLE_BASE_ID')


def request_article_rows(max_records=None):
    return request_airtable_rows(
        SCIENCE_FEEDBACK_AIRTABLE_BASE_ID,
        'Items for review / reviewed',
        filter_by_formula='({Item type}="Article")',
        max_records=max_records
    )


def request_claim_rows(max_records=None):
    return request_airtable_rows(
        SCIENCE_FEEDBACK_AIRTABLE_BASE_ID,
        'Items for review / reviewed',
        filter_by_formula='({Item type}="Claim")',
        max_records=max_records
    )


def request_review_rows(max_records=None):
    return request_airtable_rows(
        SCIENCE_FEEDBACK_AIRTABLE_BASE_ID,
        'Reviews / Fact-checks',
        max_records=max_records
    )


def request_reviewer_rows(max_records=None):
    return request_airtable_rows(
        SCIENCE_FEEDBACK_AIRTABLE_BASE_ID,
        'Reviewers',
        max_records=max_records
    )
