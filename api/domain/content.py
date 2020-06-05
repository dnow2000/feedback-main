from newspaper import Article as NewspaperArticle


def newspaper_from_url(url: str, **kwargs):
    newspaper = NewspaperArticle(
        url,
        language=kwargs.get('language', 'en')
    )
    newspaper.download()
    newspaper.parse()
    newspaper.nlp()

    return {
        'authors': ' '.join(newspaper.authors),
        'summary': newspaper.summary,
        'tags': ' '.join(newspaper.keywords),
        'title': newspaper.title,
    }
