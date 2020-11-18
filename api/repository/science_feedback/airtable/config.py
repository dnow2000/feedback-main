import os


SCIENCE_FEEDBACK_AIRTABLE_BASE_ID = os.environ.get('SCIENCE_FEEDBACK_AIRTABLE_BASE_ID')


NAME_TO_AIRTABLE = {
    'author': 'Authors',
    'editor': 'Editors',
    'reviewer': 'Reviewers',
    'claim': 'Items for review / reviewed',
    'social': 'Social Media Influent.',
    'outlet': 'Outlets',
    'link': 'Appearances',
    'verdict': 'Reviews / Fact-checks',
}
