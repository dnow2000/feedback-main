from newspaper import Article as NewspaperArticle
import requests


def article_from_newspaper_url(url: str, **kwargs):
    newspaper_article = NewspaperArticle(
        url,
        language=kwargs.get('language', 'en')
    )
    newspaper_article.download()
    newspaper_article.parse()
    newspaper_article.nlp()

    return {
        'authors': ' '.join(newspaper_article.authors),
        'summary': newspaper_article.summary,
        'tags': ' '.join(newspaper_article.keywords),
        'title': newspaper_article.title,
    }
