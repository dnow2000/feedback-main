import requests

from newspaper import Article as NewspaperArticle


def content_from_newspaper_url(url: str, **kwargs):
    newspaper_content = NewspaperArticle(
        url,
        language=kwargs.get('language', 'en')
    )
    newspaper_content.download()
    newspaper_content.parse()
    newspaper_content.nlp()

    return {
        'authors': ' '.join(newspaper_content.authors),
        'summary': newspaper_content.summary,
        'tags': ' '.join(newspaper_content.keywords),
        'title': newspaper_content.title,
    }
