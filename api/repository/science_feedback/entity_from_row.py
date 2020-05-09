from models.appearance import Appearance
from models.claim import Claim
from models.review import Review
from models.scene import Scene
from models.user import User
from utils.config import APP_NAME, TLD
from utils.credentials import random_password


def appearance_from_row(row):
    claim = Claim.query.filter_by(scienceFeedbackId=row['Item reviewed'][0]).first()
    if not claim:
        return

    testifier = User.query.filter_by(scienceFeedbackId=row['Verified by'][0]).first()
    if not testifier:
        return

    scene_dict = {'url': row['url']}
    scene = Scene.create_or_modify(scene_dict, search_by=['url'])

    appearance_dict = {
        'claim': claim,
        'scene': scene,
        'scienceFeedbackId': row['airtableId'],
        'testifier': testifier
    }

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
    reviewer = User.query.filter_by(scienceFeedbackId=row['Review editor(s)'][0]).first()
    if not reviewer:
        return

    claim = Claim.query.filter_by(scienceFeedbackId=row['Items reviewed'][0]).first()
    if not claim:
        return

    review_dict = {
        'claim': claim,
        'scienceFeedbackId': row['airtableId'],
        'reviewer': reviewer
    }

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
