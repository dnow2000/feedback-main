import requests
import re

from datetime import datetime
from bs4 import BeautifulSoup

LOCALES = {
    'es': {
        'Ene': 'Jan',
        'Abr': 'Apr',
        'Ago': 'Aug',
        'Dic': 'Dec'
    },
    'fr': {}
}


def claim_review_from_url(url, session=None):
    if session is None:
        session = requests.Session()
    with session.get(url) as response:
        soup = BeautifulSoup(response.text, 'html.parser')

        claimshort = soup.find('div', class_='claimshort')
        if not claimshort:
            return

        title = soup.find('h1', class_='entry-title')

        reviewers = []
        reviewers_title = soup.find('h3', text='Reviewers')
        if reviewers_title:
            reviewer_rows = reviewers_title.parent \
                                           .find_all('div', class_='row expert-widget')
            for reviewer_row in reviewer_rows:
                reviewer_anchor = reviewer_row.find('a')
                reviewer_url = reviewer_anchor['href']
                reviewer_name = reviewer_anchor.text
                review_row = soup.find('a', text=reviewer_name).parent.parent
                if review_row.strong is None:
                    continue
                review_row.strong.extract()
                reviewers.append({
                    'review': {
                        'comment': review_row.text
                    },
                    'url': reviewer_url
                })

        conclusions = []
        verdict_label = soup.find('img', class_='fact-check-card__row__verdict__img')['src']\
                            .split('HTag_')[1]\
                            .split('.')[0]
        if verdict_label:
            if verdict_label == 'Infonde':
                verdict_label = 'Unfounded'
            elif verdict_label == 'Inexacto-300x72':
                verdict_label = 'Inaccurate'
            conclusions.append(verdict_label.replace('_', ' '))

        # locale_abbr = re.search('sciencefeedback.co/(es|fr)/', response.url)
        # locale = None
        # if locale_abbr:
        #     locale = locale_abbr.group(1)

        # published_info_line = soup.findAll('p', class_='small')[1]
        # published_date = _localise_date(published_info_line.text, locale)

        return {
            'claim': {
                'text': claimshort.text,
            },
            'conclusions': conclusions,
            # 'publishedDate': published_date,
            'reviewers': reviewers,
            'title': title.text
        }


def _localise_date(published_info_string, locale):
    date_search_obj = re.search('([0-9]{0,2}\s([a-zA-Z]{3})\s[1-2][0-999]{3})', published_info_string)
    if date_search_obj is None:
        return None

    date_string = date_search_obj.group(1)
    month = date_search_obj.group(2)
    if LOCALES.get(locale, {}).get(month):
        date_string = date_string.replace(month, LOCALES[locale][month])

    return datetime.strptime(date_string, '%d %b %Y')
