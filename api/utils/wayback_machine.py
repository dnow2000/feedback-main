import requests

API_URL = 'http://archive.org/wayback/available?url='
BASE_URL = 'https://web.archive.org'
SAVE_URL = 'https://web.archive.org/save/'


def create_archive_url(url):
    existing = find_existing_archive(url)
    if existing:
        return existing['url']
    else:
        return url_from_wayback_machine(url)


def find_existing_archive(url):
    res = requests.get('{}{}'.format(API_URL, url)).json()
    if res['archived_snapshots'].get('closest'):
        return res['archived_snapshots']['closest']
    else:
        return None


def url_from_wayback_machine(url):
    res = requests.get('{}{}'.format(SAVE_URL, url))
    if res.status_code == 200:
        location = res.headers['Content-Location']
        return '{}{}'.format(BASE_URL, location)
    else:
        return None
