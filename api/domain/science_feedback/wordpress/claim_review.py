import requests
from bs4 import BeautifulSoup


def claim_review_from_url(url):
    result = requests.get(url)
    soup = BeautifulSoup(result.text, 'html.parser')

    title = soup.find('h1', class_='entry-title')

    reviewer_rows = soup.find('h3', text='Reviewers')\
                        .parent\
                        .find_all('div', class_='row expert-widget')

    reviewers = []
    for reviewer_row in reviewer_rows:
        reviewer_anchor = reviewer_row.find('a')
        reviewer_url = reviewer_anchor['href']
        reviewer_name = reviewer_anchor.text
        review_row = soup.find('a', text=reviewer_name).parent.parent
        review_row.strong.extract()
        reviewers.append({
            'review': {
                'comment': review_row.text
            },
            'url': reviewer_url
        })

    return {
        'claim': {
            'text': soup.find('div', class_='claimshort').text,
        },
        'evaluation': soup.find('img', class_='fact-check-card__row__verdict__img')['src']\
                          .split('HTag_')[1]\
                          .split('.')[0],
        #'comment': row.find('p').text,
        'reviewers': reviewers,
        'title': title.text
    }
