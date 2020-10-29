"""
Template for custom search API

https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json
"""

import requests

from os import environ as env
from sqlalchemy_api_handler.utils import logger

API_KEY = env.get('GOOGLE_CUSTOM_SEARCH_API_KEY')
ENGINE_ID = env.get('GOOGLE_CUSTOM_SEARCH_ENGINE_ID')
BASE_URL = f'https://www.googleapis.com/customsearch/v1?key={API_KEY}&cx={ENGINE_ID}&exactTerms=true&q='


def backlinks_from_url(url, count=10, page=1):
    backlinks = []
    if page > 0:
        start = ((page - 1) * count) + 1
        results = requests.get(f'{BASE_URL}{url}&count={count}&start={start}').json()
        items = results['items']
        backlinks = _links_from_items(items)

    return backlinks


def _links_from_items(items):
    links = []
    for item in items:
        if item['kind'] == 'customsearch#result':
            link = {}
            link['title'] = item['title']
            link['htmlTitle'] = item['htmlTitle']
            link['url'] = item['link']
            link['displayLink'] = item['displayLink']
            link['snippet'] = item['snippet']
            link['htmlSnippet'] = item['htmlSnippet']
            try:
                link['thumbImg'] = item['pagemap']['cse_thumbnail'][0]['src']
            except Exception as e:
                logger.error(f'No thumb image found for link {item["link"]}. {e}')

            links.append(link)

    return links
