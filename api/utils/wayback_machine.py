import requests
from urllib.parse import urlparse

from sqlalchemy_api_handler import logger

API_URL = 'http://archive.org/wayback/available?url='
BASE_URL = 'https://web.archive.org'
SAVE_URL = 'https://web.archive.org/save/'
ARCHIVEIS_URL = 'https://archive.vn'
FALLBACK_LIST = [
    'twitter.com',
    'instagram.com'
]


def create_wayback_machine_url(url):
    res = requests.get('{}{}'.format(SAVE_URL, url))
    if res.status_code == 200:
        location = res.headers['Content-Location']
        return '{}{}'.format(BASE_URL, location)
    else:
        return None


def find_existing_wayback_machine_url(url):
    res = requests.get('{}{}'.format(API_URL, url)).json()
    if res['archived_snapshots'].get('closest'):
        return res['archived_snapshots']['closest']
    else:
        return None


def url_from_wayback_machine(url):
    existing = find_existing_wayback_machine_url(url)
    if existing:
        return existing['url']
    else:
        return create_wayback_machine_url(url)


def url_from_archiveis(url):
    save_url = '{}/submit/'.format(ARCHIVEIS_URL)
    headers = {
        'User-Agent': 'Science Feedback (https://sciencefeedback.co)',
        'host': 'archive.today'
    }
    get_kwargs = dict(
        timeout=120,
        allow_redirects=True,
        headers=headers,
    )

    response = requests.get(ARCHIVEIS_URL + '/', **get_kwargs)
    response.raise_for_status()

    html = str(response.content)
    try:
        unique_id = html.split('name="submitid', 1)[1].split('value="', 1)[1].split('"', 1)[0]
    except IndexError as e:
        logger.error('Cannot find unique id: {}.'.format(e))
        logger.info('Submitting without unique id.')
        unique_id = None

    data = {
        "url": url,
        "anyway": 1,
    }

    if unique_id is not None:
        data.update({'submitid': unique_id})

    post_kwargs = dict(
        headers=headers,
        data=data,
        timeout=120
    )

    logger.info('Archiving URL: {}'.format(url))
    response = requests.post(save_url, **post_kwargs)
    response.raise_for_status()

    if 'Refresh' in response.headers:
        archive_url = str(response.headers['Refresh']).split(';url=')[1]
        logger.info("archive_url from Refresh header: {}".format(archive_url))
        return archive_url

    if 'Location' in response.headers:
        archive_url = response.headers['Location']
        logger.info("archive_url from Location header: {}".format(archive_url))
        return archive_url

    logger.info("archive_url not found in response headers. Inspecting history.")
    for i, r in enumerate(response.history):
        logger.info("Inspecting history request #{}".format(i))
        logger.info(r.headers)
        if 'Location' in r.headers:
            archive_url = r.headers['Location']
            logger.info("archive_url from the Location header of {} history response: {}".format(i + 1, archive_url))
            return archive_url

    # raise an exception if no url is returned at this point
    logger.error("No archive_url returned by archive.is")
    logger.error("Status code: {}".format(response.status_code))
    logger.error(response.headers)
    logger.error(response.text)
    raise Exception("No archive returned by archive.is")


def url_from_archive_services(url):
    hostname = urlparse(url).hostname
    if hostname in FALLBACK_LIST:
        return url_from_archiveis(url)
    return url_from_wayback_machine(url)
