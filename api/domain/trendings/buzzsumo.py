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
    'id' : 123,
    'published_date': 1585956625,
    'subdomain': 'www.cnn.com',
    'tags': 'climate',
    'thumbnail': 'https://cdn.cnn.com/cnnnext/dam/assets/170708175538-05-trump-abroad-0708-super-tease.jpg',
    'title': "Donald Trump buried a climate change report because 'I don't believe it'",
    'total_facebook_shares': 1000,
    'total_shares': 10000,
    'twitter_shares': 1000,
    'type': "article",
    'url': 'https://www.cnn.com/2018/11/26/politics/donald-trump-climate-change/index.html',
}, {
    'id': 1231,
    'published_date': 1585956625,
    'subdomain': 'www.cnn.com',
    'tags': 'climate',
    'thumbnail': 'https://cdn.cnn.com/cnnnext/dam/assets/180804095014-03-file-climate-change-super-tease.jpg',
    'title': "Climate change will shrink US economy and kill thousands, government report warns",
    'total_facebook_shares': 178670,
    'total_shares': 354013,
    'twitter_shares': 14228,
    'type': "article",
    'url': 'https://www.cnn.com/2018/11/23/health/climate-change-report-bn/index.html',
}, {
    'id': 1232,
    'published_date': 1585956625,
    'subdomain': 'www.upworthy.com',
    'tags': 'climate',
    'thumbnail': 'https://i.upworthy.com/nugget/5bff1e29b170e900100c4204/Marcario-091a0002863efe8fda745bafe6178f1c.jpg?ixlib=rails-2.1.3&w=1200&h=624',
    'title': "Patagonia’s CEO is donating company’s entire $10M Trump tax cut to fight climate change.",
    'total_facebook_shares': 1423505,
    'total_shares': 1434478,
    'twitter_shares': 9062,
    'type': "article",
    'url': 'https://www.upworthy.com/patagonia-s-ceo-is-donating-company-s-entire-10-m-trump-tax-cut-to-fight-climate-change',
}, {
    'id': 12321234,
    'published_date': 1585956625,
    'subdomain': 'www.motherjones.com',
    'tags': 'climate',
    'title': "19 of 20 world leaders just pledged to fight climate change. Trump was the lone holdout.",
    'thumbnail': 'https://www.motherjones.com/wp-content/uploads/2018/12/trump-g20-120118.jpeg?w=1200&h=630&crop=1',
    'total_facebook_shares': 178670,
    'total_shares': 354013,
    'twitter_shares': 14228,
    'type': "article",
    'url': 'https://www.motherjones.com/environment/2018/12/trump-g20-climate-paris-accord-denial/',
}, {
    'id': 12321235,
    'published_date': 1585956625,
    'subdomain': 'www.motherjones.com',
    'tags': 'health',
    'thumbnail': 'https://pbs.twimg.com/media/EFwWN1kWsAAt76T?format=jpg&name=small',
    'title': "Trump signs $1.8 billion autism funding bill.",
    'total_facebook_shares': 178650,
    'total_shares': 354011,
    'twitter_shares': 14248,
    'type': "article",
    'url': 'https://abcnews.go.com/Health/trump-signs-18-billion-autism-cares-act/story?id=66002425',
}, {
    'id': 121212,
    'published_date': 1585956625,
    'subdomain': 'www.motherjones.com',
    'tags': 'health',
    'thumbnail': 'https://pbs.twimg.com/media/EFwWN1kWsAAt76T?format=jpg&name=small',
    'title': "Hacer ejercicio, la mejor arma para luchar contra la depresión.",
    'total_facebook_shares': 138650,
    'total_shares': 351011,
    'twitter_shares': 13248,
    'type': "article",
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


def buzzsumo_trending_from(source_id):
    if IS_DEVELOPMENT:
        for trending in DEVELOPMENT_TRENDINGS:
            article = article_from_buzzsumo(trending)
            if article['source']['id'] == source_id:
                return article
    #
    # NEED TO WRITE THE PRODUCTIONBUZZSUMO GET API FROM ID
    #



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
        'source': {
            'id': 'buzzsumo-{}'.format(result['id']),
            'subdomain': result['subdomain'],
        },
        'title': result['title'],
        'totalShares': result['total_shares'],
        'twitterShares': result['twitter_shares'],
        'type': 'article',
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


    results = []
    trendings = []
    urls = set()
    trending_saved = 0

    if IS_DEVELOPMENT:
        results = DEVELOPMENT_TRENDINGS
    else:
        url = buzzsumo_url_from("trends", config)

        response = requests.get(url).json()
        if 'results' not in response:
            print('WARNING: EMPTY RESPONSE FROM BUZZSUMO ' + repr(response))
        results = response['results']

    for result in results:
        trending = article_from_buzzsumo(result)

        if trending['totalShares'] < min_shares:
            continue

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
