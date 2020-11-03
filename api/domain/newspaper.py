from newspaper import ArticleException, Article as NewspaperArticle


def article_from_url(url: str, language='en'):
    newspaper = NewspaperArticle(url, language=language)
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
                'urlGone': True
            }
