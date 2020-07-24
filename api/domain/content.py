from newspaper import ArticleException, Article as NewspaperArticle


def newspaper_from_url(url: str, **kwargs):
    newspaper = NewspaperArticle(url,
                                 language=kwargs.get('language', 'en'))
    newspaper.download()
    try:
        newspaper.parse()
        newspaper.nlp()

        return {
            'authors': ' '.join(newspaper.authors),
            'summary': newspaper.summary,
            'tags': ' '.join(newspaper.keywords),
            'title': newspaper.title,
            'url': url
        }
    except ArticleException as error:
        if 'failed with 410 Client Error' in str(error):
            return {
                'isGone': True
            }
