import os
import requests

AIRTABLE_API_URL = 'https://api.airtable.com/v0'
AIRTABLE_TOKEN = os.environ.get('AIRTABLE_TOKEN')


def request_airtable_rows(
    base_id,
    table_name,
    token=AIRTABLE_TOKEN
):
    url = '{}/{}/{}?view=Grid%20view'.format(AIRTABLE_API_URL, base_id, table_name)
    headers = {'Authorization': 'Bearer {}'.format(token) }
    result = requests.get(url, headers=headers)
    return [
        {'airtableId': record['id'], **record['fields']}
        for record in result.json()['records']
    ]


def rows_from(table_name):
    # airtable request api that return all the rows from the airtable
    return [
        {
            'Claim checked (or Headline if no main claim)': 'Immune discovery may treat all cancer',
            'Item type': 'Claim'
        },
        {
            'Archive link': 'http://archive.md/Vt8nP',
            'Claim checked (or Headline if no main claim)': 'Babies can feel the abortionist ripping them apart: here’s the scientific evidence',
            'Item type': 'Article'
        }
    ]
