import json
import os
import requests
import urllib.parse

AIRTABLE_API_URL = 'https://api.airtable.com/v0'
AIRTABLE_TOKEN = os.environ.get('AIRTABLE_TOKEN')


def request_airtable_rows(
        base_id,
        table_name,
        filter_by_formula=None,
        max_records=None,
        session=None,
        token=AIRTABLE_TOKEN
):
    url = '{}/{}/{}?view=Grid%20view'.format(
        AIRTABLE_API_URL,
        base_id,
        urllib.parse.quote(table_name, safe='')
    )

    if filter_by_formula:
        url = '{}&filterByFormula={}'.format(
            url,
            urllib.parse.quote(filter_by_formula)
        )

    if max_records:
        url = '{}&maxRecords={}'.format(url, max_records)

    headers = {'Authorization': 'Bearer {}'.format(token)}

    if session is None:
        session = requests.Session()

    with session:
        result = session.get(url, headers=headers).json()
        records = result.get('records')
        offset = result.get('offset')
        while offset:
            url_with_offset = '{}&offset={}'.format(url, offset)
            result = session.get(url_with_offset, headers=headers).json()
            offset = result.get('offset')
            records += result.get('records')

    return [
        {'airtableId': record['id'], **record['fields']}
        for (index, record) in enumerate(records)
    ]


def update_airtable_rows(
    base_id,
    table_name,
    records,
    session=None,
    token=AIRTABLE_TOKEN
):
    url = '{}/{}/{}'.format(
        AIRTABLE_API_URL,
        base_id,
        urllib.parse.quote(table_name, safe='')
    )

    headers = {
        'Authorization': 'Bearer {}'.format(token),
        'Content-Type': 'application/json'
    }

    if session is None:
        session = requests.Session()

    return session.patch(url, headers=headers, data=json.dumps(records))
