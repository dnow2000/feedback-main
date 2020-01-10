from newspaper import Article as NewspaperArticle
import requests

from utils.buzzsumo import get_content_with_buzzsumo_result, \
                           get_buzzsumo_url

def get_buzzsumo_content(url: str, **kwargs):
    url = get_buzzsumo_url("articles", { "q": url })
    response = requests.get(url)

    json_file = response.json()
    if 'results' not in json_file:
        return {}

    results = json_file['results']

    if len(results) == 1:
        content = get_content_with_buzzsumo_result(results[0])
        return content

def get_newspaper_content(url: str, **kwargs):
    newspaper_article = NewspaperArticle(
        url,
        language=kwargs.get('language', 'en')
    )
    newspaper_article.download()
    newspaper_article.parse()
    newspaper_article.nlp()

    content = {}
    content['authors'] = ' '.join(newspaper_article.authors)
    content['title'] = newspaper_article.title
    content['summary'] = newspaper_article.summary
    content['tags'] = ' '.join(newspaper_article.keywords)

    return content
