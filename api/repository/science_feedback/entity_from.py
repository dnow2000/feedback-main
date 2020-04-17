from models.article import Article
from models.claim import Claim
from models.review import Review
from models.user import User
from utils.credentials import random_password


def article_from(article_dict):
    return Article.create_or_modify(article_dict, search_by=['scienceFeedbackId'])


def claim_from(claim_dict):
    return Claim.create_or_modify(claim_dict, search_by=['scienceFeedbackId'])


def review_from(review_dict):
    return Review.create_or_modify(review_dict, search_by=['scienceFeedbackId'])


def reviewer_from(user_dict):
    user = User.create_or_modify(user_dict, search_by=['scienceFeedbackId'])
    user.set_password(random_password())
    return user
