from bs4 import BeautifulSoup
import re
import requests
from sqlalchemy_api_handler import logger

from utils.config import APP_NAME, TLD


def reviewer_from_row(row):
    expertise_line = row.find_all('p')[1].text
    if 'Expertise:' in expertise_line:
        expertise = expertise_line.split('Expertise: ')[1]
    else:
        expertise = None

    first_name = None
    last_name = row.h3.a.text
    if ' ' in row.h3.a.text:
        name_chunks = row.h3.a.text.split(' ')
        first_name = name_chunks[0]
        last_name = name_chunks[1:]

    reviewer = {
        'affiliation': row.p.text.split(',')[1],
        'expertise': expertise,
        'externalThumbUrl': row.img['src'],
        'firstName': first_name,
        'lastName': last_name,
        'title': row.p.text.split(',')[0],
        **reviewer_from_url(row.h3.a['href'])
    }
    reviewer['email'] = '{}.{}@{}.{}'.format(
        reviewer['firstName'],
        reviewer['lastName'],
        APP_NAME,
        TLD
    )
    return reviewer


def reviewer_from_url(url):
    result = requests.get('https://climatefeedback.org{}'.format(url))
    soup = BeautifulSoup(result.text, 'html.parser')
    info = soup.find('div', class_='med-body')

    name = info.find('h2', class_='noborder').text
    first_name = None
    last_name = name
    if ' ' in name:
        name_chunks = name.split(' ')
        first_name = name_chunks[0]
        last_name = name_chunks[1:]
    paragraphs = info.find_all('p')
    situation_line = paragraphs[0].text
    expertise_line = paragraphs[1].text
    orcid = info.find('a', href=re.compile('https://orcid.org/(.*)'))
    website = info.find('a', text='Website')

    publications = []
    publication_image = info.find('img', alt='publication')
    if publication_image:
        publication_anchors = publication_image.parent.find_all('a')
        for publication_anchor in publication_anchors:
            publications.append({'url': publication_anchor['href']})

    return {
        'affiliation': situation_line.split(',')[1],
        'expertise': expertise_line.split('Expertise: ')[1] \
            if 'Expertise:' in expertise_line \
            else None,
        'external_thumb_url': soup.find('img', class_='avatar')['src'],
        'firstName': first_name,
        'last_name': last_name,
        'orcidId': orcid and orcid['href'].split('https://orcid.org/')[1],
        'publications': publications,
        'title': situation_line.split(',')[0],
        'websiteUrl': website and website['href']
    }


def scrap_reviewers(reviewers_max=3):
    result = requests.get('https://climatefeedback.org/community/')
    soup = BeautifulSoup(result.text, 'html.parser')

    rows = soup.find_all('div', class_='row expert')
    if reviewers_max is None:
        reviewers_max = len(rows)

    return [
        reviewer_from_row(row)
        for row in rows[:reviewers_max]
    ]
