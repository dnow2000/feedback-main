from sqlalchemy_api_handler.utils import humanize

from models.appearance import Appearance
from models.author_content import AuthorContent
from models.claim import Claim
from models.review import Review
from models.content import Content, ContentType
from models.medium import Medium
from models.organization import Organization
from models.role import Role, RoleType
from models.user import User
from models.verdict import Verdict, PostType
from utils.config import  API_URL, \
                          APP_NAME, \
                          COMMAND_NAME, \
                          DEFAULT_USER_PASSWORD, \
                          IS_DEVELOPMENT, \
                          TLD
from utils.date import strptime
from utils.password import create_random_password


def appearance_from_row(row, unused_index=None):
    reviewed_items = row.get('Item reviewed')
    if not reviewed_items:
        return None

    quoting_content = Content.create_or_modify({
        '__SEARCH_BY__': 'url',
        # TODO : needs a better resolution for the type
        'type': ContentType.VIDEO if row['url'].startswith('https://www.youtube.com/watch?v') else ContentType.ARTICLE,
        'url': row['url'].strip()
    })
    medium_science_feedback_ids = row.get('Outlet')
    if medium_science_feedback_ids:
        medium = Medium.query.filter_by(
            scienceFeedbackIdentifier=medium_science_feedback_ids[0]).first()
        quoting_content.mediumId = medium.id

    author_science_feedback_ids = row.get('Authors')
    if author_science_feedback_ids:
        for author_science_feedback_id in author_science_feedback_ids:
            author = User.query.filter_by(
                scienceFeedbackIdentifier=author_science_feedback_id).first()
            author_content = AuthorContent.create_or_modify({
                '__SEARCH_BY__': ['authorId', 'contentId'],
                'authorId': humanize(author.id),
                'contentId': humanize(quoting_content.id)
            })
            quoting_content.authorContents = quoting_content.authorContents + [author_content]

    quoted_claim = Claim.query.filter_by(
        scienceFeedbackIdentifier=reviewed_items[0]).first()
    quoted_content = None
    if not quoted_claim:
        quoted_content = Content.query.filter_by(
            scienceFeedbackIdentifier=reviewed_items[0]).first()
    if not quoted_claim and not quoted_content:
        return None

    testifier_science_feedback_ids = row.get('Verified by')
    if not testifier_science_feedback_ids:
        return None
    testifier = User.query.filter_by(
        scienceFeedbackIdentifier=testifier_science_feedback_ids[0]).first()
    if not testifier:
        return None

    if IS_DEVELOPMENT:
        quoting_content.externalThumbUrl = API_URL + '/static/logo.png' if IS_DEVELOPMENT else None
        quoting_content.title = "/".join(quoting_content.url
                                                        .replace('http://', '') \
                                                        .replace('https://', '') \
                                                        .split('/')[-2:]) \
                                   .replace('-', ' ')

    appearance_dict = {
        '__SEARCH_BY__': 'scienceFeedbackIdentifier',
        'quotedClaim': quoted_claim,
        'quotedContent': quoted_content,
        'quotingContent': quoting_content,
        'scienceFeedbackIdentifier': row['airtableId'],
        'testifier': testifier
    }

    return Appearance.create_or_modify(appearance_dict)


def author_from_row(row, index=None):
    chunks = row.get('Name', '').split(' ')
    first_name = '{}test'.format(COMMAND_NAME).title() if IS_DEVELOPMENT \
                 else chunks[0]
    last_name = 'Author{}'.format(index) if IS_DEVELOPMENT \
                else ' '.join(chunks[1:]).replace('\'', '')
    user_dict = {
        '__SEARCH_BY__': 'email',
        'email': '{}.{}@{}.{}'.format(
            first_name.lower(),
            last_name.lower(),
            APP_NAME,
            TLD),
        'firstName': first_name,
        'lastName': last_name,
        'scienceFeedbackIdentifier': row['airtableId']
    }

    user = User.create_or_modify(user_dict)
    if not user.id:
        user.set_password(DEFAULT_USER_PASSWORD if IS_DEVELOPMENT else create_random_password())

    role = Role.create_or_modify({
        '__SEARCH_BY__': ['type', 'userId'],
        'type': RoleType.AUTHOR,
        'userId': humanize(user.id)
    })
    user.roles = user.roles + [role]

    return user


def claim_from_row(row, unused_index=None):
    text = row.get('Claim checked (or Headline if no main claim)')
    if not text:
        return None

    claim_dict = {
        '__SEARCH_BY__': 'scienceFeedbackIdentifier',
        'scienceFeedbackIdentifier': row['airtableId'],
        'text': text
    }

    return Claim.create_or_modify(claim_dict)


def editor_from_row(row, index=None):
    chunks = row.get('Name', '').split(' ')
    first_name = '{}test'.format(COMMAND_NAME).title() if IS_DEVELOPMENT \
                 else chunks[0]
    last_name = 'Editor{}'.format(index) if IS_DEVELOPMENT \
                else ' '.join(chunks[1:]).replace('\'', '')
    user_dict = {
        '__SEARCH_BY__': 'email',
        'email': row.get('Email',
                         '{}.{}@{}.{}'.format(first_name.lower(),
                                              last_name.lower(),
                                              APP_NAME,
                                              TLD),
        'firstName': first_name,
        'lastName': last_name,
        'scienceFeedbackIdentifier': row['airtableId']
    }

    user = User.create_or_modify(user_dict)
    if not user.id:
        user.set_password(DEFAULT_USER_PASSWORD if IS_DEVELOPMENT else create_random_password())

    role = Role.create_or_modify({
        '__SEARCH_BY__': ['type', 'userId'],
        'type': RoleType.EDITOR,
        'userId': humanize(user.id)
    })
    user.roles = user.roles + [role]

    return user


def outlet_from_row(row, unused_index=None):
    medium_dict = {
        '__SEARCH_BY__': 'scienceFeedbackIdentifier',
        'name': row['Name'],
        'scienceFeedbackIdentifier': row['airtableId']
    }

    return Medium.create_or_modify(medium_dict)


def review_from_row(row, unused_index=None):
    science_feedback_reviewer_ids = row.get('Review editor(s)')
    if not science_feedback_reviewer_ids:
        return None
    reviewer = User.query.filter_by(
        scienceFeedbackIdentifier=science_feedback_reviewer_ids[0]).first()
    if not reviewer:
        return None

    claim = Claim.query.filter_by(
        scienceFeedbackIdentifier=row['Items reviewed'][0]).first()
    if not claim:
        return None

    review_dict = {
        '__SEARCH_BY__': 'scienceFeedbackIdentifier',
        'claim': claim,
        'scienceFeedbackIdentifier': row['airtableId'],
        'reviewer': reviewer
    }

    return Review.create_or_modify(review_dict)


def reviewer_from_row(row, index=None):
    first_name = '{}test'.format(COMMAND_NAME).title() if IS_DEVELOPMENT \
                 else row['First name']
    last_name = 'Reviewer{}'.format(index) if IS_DEVELOPMENT \
                 else row['Last name']
    user_dict = {
        '__SEARCH_BY__': 'email',
        'email': '{}.{}@{}.{}'.format(first_name.lower(),
                                      last_name.lower(),
                                      APP_NAME,
                                      TLD) if IS_DEVELOPMENT else row['Email'],
        'firstName': first_name,
        'lastName': last_name,
        'scienceFeedbackIdentifier': row['airtableId']
    }

    user = User.create_or_modify(user_dict)
    if not user.id:
        user.set_password(DEFAULT_USER_PASSWORD if IS_DEVELOPMENT else create_random_password())

    role = Role.create_or_modify({
        '__SEARCH_BY__': ['type', 'userId'],
        'type': RoleType.REVIEWER,
        'userId': humanize(user.id)
    })
    user.roles = user.roles + [role]

    return user


def social_from_row(row, unused_index=None):
    if row.get('url') is None:
        return None

    organization_name = row['url'].replace('https://www.', '') \
                                  .split('/')[0] \
                                  .split('.')[0] \
                                  .title()
    organization = Organization.create_or_modify({
        '__SEARCH_BY__': 'name',
        'name': organization_name
    })

    medium_dict = {
        '__SEARCH_BY__': 'scienceFeedbackIdentifier',
        'name': row['Name'],
        'organization': organization,
        'scienceFeedbackIdentifier': row['airtableId'],
        'url': row['url']
    }

    return Medium.create_or_modify(medium_dict)


def verdict_from_row(row, unused_index=None):
    science_feedback_editor_ids = row.get('Review editor(s)')
    if not science_feedback_editor_ids:
        return None
    editor = User.query.filter_by(scienceFeedbackIdentifier=science_feedback_editor_ids[0]).first()
    if not editor:
        return None

    claim = Claim.query.filter_by(scienceFeedbackIdentifier=row['Items reviewed'][0]).first()
    if not claim:
        return None

    medium = Medium.query.filter_by(url='/'.join(row['Review url'].split('/')[0:3])).first()
    published_date = strptime(row['Date of publication'], '%Y-%m-%d')

    verdict_dict = {
        '__SEARCH_BY__': 'scienceFeedbackIdentifier',
        'claim': claim,
        'editor': editor,
        'medium': medium,
        'scienceFeedbackIdentifier': row['airtableId'],
        'scienceFeedbackUrl': row['Review url'],
        'scienceFeedbackPublishedDate': published_date,
        'title': row['Review headline']
    }

    return Verdict.create_or_modify(verdict_dict)
