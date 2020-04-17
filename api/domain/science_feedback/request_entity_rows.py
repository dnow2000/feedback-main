import os

from utils.airtable import request_airtable_rows


SCIENCE_FEEDBACK_AIRTABLE_BASE_ID = os.environ.get('SCIENCE_FEEDBACK_AIRTABLE_BASE_ID')


def request_article_rows():
    return [
        row for row in
        request_airtable_rows(
            SCIENCE_FEEDBACK_AIRTABLE_BASE_ID,
            'Items for review / reviewed'
        )
        if row['Item type'] == 'Article'
    ]


def request_claim_rows():
    return [
        row for row in
        request_airtable_rows(
            SCIENCE_FEEDBACK_AIRTABLE_BASE_ID,
            'Items for review / reviewed'
        )
        if row['Item type'] == 'Claim'
    ]


def request_reviewer_rows():
    return request_airtable_rows(
        SCIENCE_FEEDBACK_AIRTABLE_BASE_ID,
        'Reviewers'
    )
