import os
from datetime import datetime
import requests
from sqlalchemy_api_handler import logger
from urllib.parse import urlencode

from utils.date import strftime
from utils.config import IS_DEVELOPMENT


BUZZSUMO_API_KEY = os.environ.get('BUZZSUMO_API_KEY')
BUZZSUMO_API_URL = "http://api.buzzsumo.com/search"

if BUZZSUMO_API_KEY is None:
    logger.warning('BUZZSUMO_API_KEY is not defined in the env')


DEVELOPMENT_TRENDINGS = [{
    'externalThumbUrl': 'https://cdn.cnn.com/cnnnext/dam/assets/170708175538-05-trump-abroad-0708-super-tease.jpg',
    'facebookShares': 1000,
    'publishedDate': "Tue, 12 Mar 2019 01:02:00 GMT",
    'sourceId': 'source-123',
    'subdomain': 'www.cnn.com',
    'tags': 'climate',
    'title': "Donald Trump buried a climate change report because 'I don't believe it'",
    'totalShares': 10000,
    'twitterShares': 1000,
    'url': 'https://www.cnn.com/2018/11/26/politics/donald-trump-climate-change/index.html',
}, {
    'externalThumbUrl': 'https://cdn.cnn.com/cnnnext/dam/assets/180804095014-03-file-climate-change-super-tease.jpg',
    'facebookShares': 178670,
    'sourceId': 'source-1231',
    'publishedDate': "Wed, 13 Mar 2019 01:02:00 GMT",
    'subdomain': 'www.cnn.com',
    'tags': 'climate',
    'title': "Climate change will shrink US economy and kill thousands, government report warns",
    'totalShares': 354013,
    'twitterShares': 14228,
    'url': 'https://www.cnn.com/2018/11/23/health/climate-change-report-bn/index.html',
}, {
    'externalThumbUrl': 'https://i.upworthy.com/nugget/5bff1e29b170e900100c4204/Marcario-091a0002863efe8fda745bafe6178f1c.jpg?ixlib=rails-2.1.3&w=1200&h=624',
    'facebookShares': 1423505,
    'publishedDate': "Mon, 11 Mar 2019 05:02:00 GMT",
    'sourceId': 'buzzsumo-1232',
    'subdomain': 'www.upworthy.com',
    'tags': 'climate',
    'title': "Patagonia’s CEO is donating company’s entire $10M Trump tax cut to fight climate change.",
    'totalShares': 1434478,
    'twitterShares': 9062,
    'url': 'https://www.upworthy.com/patagonia-s-ceo-is-donating-company-s-entire-10-m-trump-tax-cut-to-fight-climate-change',
}, {
    'externalThumbUrl': 'https://www.motherjones.com/wp-content/uploads/2018/12/trump-g20-120118.jpeg?w=1200&h=630&crop=1',
    'facebookShares': 178670,
    'publishedDate': "Mon, 11 Mar 2019 05:02:00 GMT",
    'sourceId': 'source-12321234',
    'subdomain': 'www.motherjones.com',
    'tags': 'climate',
    'title': "19 of 20 world leaders just pledged to fight climate change. Trump was the lone holdout.",
    'totalShares': 354013,
    'twitterShares': 14228,
    'url': 'https://www.motherjones.com/environment/2018/12/trump-g20-climate-paris-accord-denial/',
}, {
    'externalThumbUrl': 'https://pbs.twimg.com/media/EFwWN1kWsAAt76T?format=jpg&name=small',
    'facebookShares': 178650,
    'publishedDate': "Mon, 11 Mar 2019 05:02:00 GMT",
    'sourceId': 'buzzsumo-12321235',
    'subdomain': 'www.motherjones.com',
    'tags': 'health',
    'title': "Trump signs $1.8 billion autism funding bill.",
    'totalShares': 354011,
    'twitterShares': 14248,
    'url': 'https://abcnews.go.com/Health/trump-signs-18-billion-autism-cares-act/story?id=66002425',
}, {
    'externalThumbUrl': 'https://pbs.twimg.com/media/EFwWN1kWsAAt76T?format=jpg&name=small',
    'facebookShares': 138650,
    'publishedDate': "Mon, 11 Mar 2019 05:02:00 GMT",
    'sourceId': 'buzzsumo-121212',
    'subdomain': 'www.motherjones.com',
    'tags': 'health',
    'title': "Hacer ejercicio, la mejor arma para luchar contra la depresión.",
    'totalShares': 351011,
    'twitterShares': 13248,
    'url': 'https://www.menshealth.com/es/salud-bienestar/a26409675/depresion-ejercicio-ansiedad-prevenir/',
}]


def buzzsumo_url_from(api_name, url_query):
    url_query_with_credentials = dict(
        url_query,
        **{ 'api_key': BUZZSUMO_API_KEY }
    )

    url_location_search_with_credentials = urlencode(url_query_with_credentials)

    url = "{}/{}.json?{}".format(
        BUZZSUMO_API_URL,
        api_name,
        url_location_search_with_credentials
    )

    return url


def get_buzzsumo_trending(id):
    trending = None
    if IS_DEVELOPMENT:
        buzzsumo_id_number = int(id)
        kept_trendings = [
            trending for trending in DEVELOPMENT_TRENDINGS
            if trending['buzzsumoId'] == buzzsumo_id_number
        ]
        if len(kept_trendings) > 0:
            trending = kept_trendings[0]

    #
    # NEED TO WRITE THE PRODUCTIONBUZZSUMO GET API FROM ID
    #

    return trending


def topic_from(theme):
    if theme == 'climate':
        return 'global warming,climate change,ocean acidification,sea level rise,carbon dioxide,CO2,greenhouse gases'
    elif theme =='health':
        return 'vaccine,vaccines,disease,diseases,health,healthy,virus,Natural Remedy,alternative medicine,homeopathy,anti-inflammatory,trans fat,trans fats,immune system,cardiovascular diseases,measles'
    return None


def article_from_buzzsumo(result):
    return {
        'externalThumbUrl': result['thumbnail'],
        'facebookShares': result['total_facebook_shares'],
        'publishedDate': strftime(datetime.utcfromtimestamp(result['published_date'])),
        'sourceId': 'buzzsumo-{}'.format(result['id']),
        'subdomain': result['subdomain'],
        'title': result['title'],
        'totalShares': result['total_shares'],
        'twitterShares': result['twitter_shares'],
        'url': result.get('og_url', '')
    }


def article_from_buzzsumo_url(url: str, **kwargs):
    url = buzzsumo_url_from("articles", { "q": url })
    response = requests.get(url)

    json_file = response.json()
    if 'results' not in json_file:
        return {}

    results = json_file['results']

    if len(results) == 1:
        return article_from_buzzsumo(results[0])


def find_buzzsumo_trendings(
    days=1,
    max_trendings=3,
    min_shares=10000,
    theme=None,
):

    config = {
        "count": max_trendings * 2,
        "search_type": "trending_now"
    }

    topic = topic_from(theme)
    if topic:
        config["topic"] = topic
    if days:
        config["hours"] = int(days) * 24

    url = buzzsumo_url_from("trends", config)

    response = requests.get(url).json()
    trendings = []
    urls = set()

    trending_saved = 0

    if 'results' not in response:
        print('WARNING: EMPTY RESPONSE FROM BUZZSUMO ' + repr(response))
        if IS_DEVELOPMENT:
            return DEVELOPMENT_TRENDINGS
        else:
            return []

    for result in response['results']:
        if result['total_shares'] < min_shares:
            continue

        trending = article_from_buzzsumo(result)
        if theme:
            trending['theme'] = theme.title()

        if trending.get('url') in urls:
            print('WARNING, BUZZSUMO RETURNS SEVERAL TIMES THE SAME URL')
            continue

        if trending.get('url'):
            urls.add(url)

        trendings.append(trending)

        trending_saved += 1
        if trending_saved >= max_trendings:
            break

    return trendings
