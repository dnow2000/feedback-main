from models.article import Article
from models.claim import Claim
from models.review import Review
from models.user import User
from utils.credentials import random_password


def article_from(row):
    if 'Archive link' not in row:
        return

    article_dict = {
        'scienceFeedbackId': row['airtableId'],
        'title': row['Claim checked (or Headline if no main claim)'],
        'url': 'http' + row['Archive link'].split('http')[1]
    }

    return Article.create_or_modify(article_dict, search_by=['scienceFeedbackId'])


def claim_from(row):
    claim_dict = {
        'scienceFeedbackId': row['airtableId'],
        'text': row['Claim checked (or Headline if no main claim)']
    }

    return Claim.create_or_modify(claim_dict, search_by=['scienceFeedbackId'])


def review_from(row):
    user = User.query.filter_by(scienceFeedbackId=row['Review editor(s)'][0]).first()
    if not user:
        return


    print('OUAI')

    review_dict = {
        'scienceFeedbackId': row['airtableId'],
        'userId': user.id
    }

    reviewed_science_feedback_id = row['Items reviewed'][0]
    article = Article.query.filter_by(scienceFeedbackId=reviewed_science_feedback_id).first()
    if article:
        review_dict['articleId'] = article.id
    else:
        claim = Claim.query.filter_by(scienceFeedbackId=reviewed_science_feedback_id).first()
        if not claim:
            return
        review_dict['claimId'] = claim.id

    return Review.create_or_modify(review_dict, search_by=['scienceFeedbackId'])


def reviewer_from(row):
    user_dict = {
        'email': row['Email'],
        'firstName': row['First name'],
        'lastName': row['Last name'],
        'scienceFeedbackId': row['airtableId']
    }

    user = User.create_or_modify(user_dict, search_by=['scienceFeedbackId'])
    if not user.id:
        user.set_password(random_password())

    return user
