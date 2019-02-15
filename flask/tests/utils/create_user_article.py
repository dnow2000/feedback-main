""" create_user """
from models.user_article import UserArticle

def create_user_article(
    user=None,
    article=None
):
    user_article = UserArticle()
    user_article.user = user
    user_article.article = article
    return user_article
