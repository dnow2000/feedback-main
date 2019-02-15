from models.article import Article

def create_article(
        url=None,
        authors=None,
        summary=None,
        tags=None,
        title=None,
        is_reviewable=None
):
    article = Article()
    article.authors = authors
    article.isReviewable = is_reviewable
    article.summary = summary
    article.tatgs = tags
    article.title = title
    article.url = url


    return article
