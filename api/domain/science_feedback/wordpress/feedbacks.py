import requests
from bs4 import BeautifulSoup


def feedback_from_url(url):
    result = requests.get(url)
    soup = BeautifulSoup(result.text, 'html.parser')

    row = soup.find('div', class_='entry-content')

    title = soup.find('h4', text='REVIEWERS’ OVERALL FEEDBACK')
    if title is None:
        title = soup.find('h4', text='GUEST COMMENTS')
    reviews = title.parent
    reviewer_rows = soup.find('h3', text='Reviewers')\
                        .parent\
                        .find_all('div', class_='row expert-widget')
    reviewers = []
    for reviewer_row in reviewer_rows:
        reviewer_anchor = reviewer_row.find('a')
        reviewer_url = reviewer_anchor['href']
        reviewer_name = reviewer_anchor.text
        review_row = reviews.find('a', text=reviewer_name).parent.parent
        review_row.strong.extract()
        reviewers.append({
            'review': {
                'comment': review_row.text
            },
            'url': reviewer_url
        })

    return {
        'article': {
            'title': soup.find('h1', class_='entry-title').text,
            'url': row.find('a', class_='inline-btn')['href']
        },
        'comment': row.find('p').text,
        'reviewers': reviewers
    }


def feedback_from_row(row):
    media_body = row.find('div', class_='media-body')
    url = media_body.find('a')['href']
    return feedback_from_url(url)


def scrap_feedbacks(feedbacks_max=None):
    result = requests.get('https://climatefeedback.org/feedbacks')
    soup = BeautifulSoup(result.text, 'html.parser')

    rows = soup.find('main').find_all('div', class_='row')
    if feedbacks_max is None:
        feedbacks_max = len(rows)

    return [
        feedback_from_row(row)
        for row in rows[:feedbacks_max]
    ]
