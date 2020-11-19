import requests

from bs4 import BeautifulSoup

LABELS = {
    'Infonde': 'Unfounded',
    'Inexacto-300x72': 'Inaccurate'
}


def tags_from_url(url, session=None):
    if session is None:
        session = requests.Session()
    with session.get(url) as response:
        soup = BeautifulSoup(response.text, 'html.parser')

        conclusions = []

        verdict_label = soup.find('img', class_='fact-check-card__row__verdict__img')['src']\
                            .split('HTag_')[1]\
                            .split('.')[0]

        if verdict_label:
            if LABELS.get(verdict_label):
                verdict_label = LABELS[verdict_label]
            conclusions.append(verdict_label.replace('_', ' '))

        return conclusions
