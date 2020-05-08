from models.appearance import Appearance
from models.article import Article
from models.claim import Claim
from models.review import Review
from models.scene import Scene
from models.user import User
from utils.config import APP_NAME, TLD
from utils.credentials import random_password


def appearance_from_row(row):
    appearance_dict = {
        'scienceFeedbackId': row['airtableId'],
    }

    claim = Claim.query.filter_by(scienceFeedbackId=row['Item reviewed'][0]).first()
    if not claim:
        return
    appearance_dict['claim'] = claim

    scene_dict = { 'url': row['url'] }
    scene = Scene.create_or_modify(scene_dict, search_by=['url'])
    appearance_dict['scene'] = scene

    return Appearance.create_or_modify(appearance_dict, search_by=['scienceFeedbackId'])


def claim_from_row(row):
    claim_dict = {
        'scienceFeedbackId': row['airtableId'],
        'text': row['Claim checked (or Headline if no main claim)']
    }

    return Claim.create_or_modify(claim_dict, search_by=['scienceFeedbackId'])


def editor_from_row(row):
    first_name, last_name = row['Name'].split(' ')
    user_dict = {
        'email': '{}.{}@{}.{}'.format(first_name, last_name, APP_NAME, TLD),
        'firstName': first_name,
        'lastName': last_name,
        'scienceFeedbackId': row['airtableId']
    }

    user = User.create_or_modify(user_dict, search_by=['scienceFeedbackId'])
    if not user.id:
        user.set_password(random_password())

    return user


def review_from_row(row):
    user = User.query.filter_by(scienceFeedbackId=row['Review editor(s)'][0]).first()
    if not user:
        return

    review_dict = {
        'scienceFeedbackId': row['airtableId'],
        'user': user
    }

    reviewed_science_feedback_id = row['Items reviewed'][0]
    article = Article.query.filter_by(scienceFeedbackId=reviewed_science_feedback_id).first()
    if article:
        review_dict['article'] = article
    else:
        claim = Claim.query.filter_by(scienceFeedbackId=reviewed_science_feedback_id).first()
        if not claim:
            return
        review_dict['claim'] = claim

    return Review.create_or_modify(review_dict, search_by=['scienceFeedbackId'])


def reviewer_from_row(row):
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
