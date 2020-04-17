from models.article import Article
from models.claim import Claim
from models.user import User
from utils.credentials import random_password


def article_from(article_dict):
    article = Article.create_or_modify(article_dict, search_by='url')
    return article


def claim_from(claim_dict):
    claim = Claim.create_or_modify(claim_dict, search_by='text')
    return claim


def reviewer_from(user_dict):
    user = User.create_or_modify(user_dict, search_by=['firstName', 'lastName'])
    user.set_password(random_password())
    return user
