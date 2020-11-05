from domain.newspaper import article_from_url as newspaper_article_from_url
from domain.trendings.buzzsumo import trending_from_url as buzzsumo_trending_from_url
from models.content import Content

def scrap_from_url(url, **kwargs):
    content = Content.create_or_modify({
        '__SEARCH_BY__': 'url',
        'url': url
    })

    trending = buzzsumo_trending_from_url(url, **kwargs)
    if trending:
        return content.modify(trending)

    if url:
        newspaper = newspaper_article_from_url(url, **kwargs)
        if newspaper:
            return content.modify(newspaper)

    content.urlNotFound = True
    return content
