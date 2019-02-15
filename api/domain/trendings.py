import requests

from utils.buzzsumo import get_content_with_buzzsumo_result, \
                           get_buzzsumo_url
from utils.config import IS_DEV

def get_topic_with_theme(theme):
    if theme == 'climate':
        return 'global warming,climate change,ocean acidification,sea level rise,carbon dioxide,CO2,greenhouse gases'
    elif theme =='health':
        return 'vaccine,vaccines,disease,diseases,health,healthy,virus,Natural Remedy,alternative medicine,homeopathy,anti-inflammatory,trans fat,trans fats,immune system,cardiovascular diseases,measles'
    return None

def get_trendings(
    days=1,
    topic=None,
    max_trendings=3,
    min_shares=10000,
):

    config = {
        "count": max_trendings * 2,
        "search_type": "trending_now"
    }
    if topic:
        config["topic"] = topic
    if days:
        config["hours"] = int(days) * 24

    url = get_buzzsumo_url("trends", config)

    response = requests.get(url).json()
    trendings = []
    urls = set()

    trending_saved = 0

    if 'results' not in response:
        print('WARNING: EMPTY RESPONSE FROM BUZZSUMO ' + repr(response))
        if IS_DEV:
            return [{
                'externalThumbUrl': 'https://cdn.cnn.com/cnnnext/dam/assets/170708175538-05-trump-abroad-0708-super-tease.jpg',
                'facebookShares': 1000,
                'buzzsumoId': 123,
                'subdomain': 'www.cnn.com',
                'tags': 'climate',
                'title': "Donald Trump buried a climate change report because 'I don't believe it'",
                'totalShares': 10000,
                'twitterShares': 1000,
                'url': 'https://www.cnn.com/2018/11/26/politics/donald-trump-climate-change/index.html',
            },{
                'buzzsumoId': 1231,
                'externalThumbUrl': 'https://cdn.cnn.com/cnnnext/dam/assets/180804095014-03-file-climate-change-super-tease.jpg',
                'facebookShares': 178670,
                'subdomain': 'www.cnn.com',
                'tags': 'climate',
                'title': "Climate change will shrink US economy and kill thousands, government report warns",
                'totalShares': 354013,
                'twitterShares': 14228,
                'url': 'https://www.cnn.com/2018/11/23/health/climate-change-report-bn/index.html',

            },{
                'buzzsumoId': 1232,
                'externalThumbUrl': 'https://i.upworthy.com/nugget/5bff1e29b170e900100c4204/Marcario-091a0002863efe8fda745bafe6178f1c.jpg?ixlib=rails-2.1.3&w=1200&h=624',
                'facebookShares': 1423505,
                'subdomain': 'www.upworthy.com',
                'tags': 'climate',
                'title': "Patagonia’s CEO is donating company’s entire $10M Trump tax cut to fight climate change.",
                'totalShares': 1434478,
                'twitterShares': 9062,
                'url': 'https://www.upworthy.com/patagonia-s-ceo-is-donating-company-s-entire-10-m-trump-tax-cut-to-fight-climate-change',
            }, {
                'buzzsumoId': 12321234,
                'facebookShares': 178670,
                'externalThumbUrl': 'https://www.motherjones.com/wp-content/uploads/2018/12/trump-g20-120118.jpeg?w=1200&h=630&crop=1',
                'subdomain': 'www.motherjones.com',
                'tags': 'climate',
                'title': "19 of 20 world leaders just pledged to fight climate change. Trump was the lone holdout.",
                'totalShares': 354013,
                'twitterShares': 14228,
                'url': 'https://www.motherjones.com/environment/2018/12/trump-g20-climate-paris-accord-denial/',
            }]
        else:
            return []

    for result in response['results']:
        if result['total_shares'] < min_shares:
            continue

        trending = get_content_with_buzzsumo_result(result)

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
