from models.article_tag import ArticleTag

def create_article_tag(
        article=None,
        tag=None
):
    article_tag = ArticleTag()
    article_tag.article = article
    article_tag.tag = tag
    return article_tag
