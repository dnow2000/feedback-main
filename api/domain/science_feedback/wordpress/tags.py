import requests

from bs4 import BeautifulSoup


def tags_from_url(url, session=None):
    if session is None:
        session = requests.Session()
    with session.get(url) as response:
        soup = BeautifulSoup(response.text, 'html.parser')

    verdict_label = soup.find('img', class_='fact-check-card__row__verdict__img')['src']\
                            .split('HTag_')[1]\
                            .split('.')[0]
        if verdict_label:
            if verdict_label == 'Infonde':
                verdict_label = 'Unfounded'
            elif verdict_label == 'Inexacto-300x72':
                verdict_label = 'Inaccurate'
            conclusions.append(verdict_label.replace('_', ' '))
