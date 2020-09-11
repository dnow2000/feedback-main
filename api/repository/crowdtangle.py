from datetime import datetime

from domain.crowdtangle import shares_from_url
from sqlalchemy_api_handler import ApiHandler, humanize
from models.appearance import Appearance
from models.content import Content
from models.medium import Medium
from models.platform import Platform
from models.user import User


def attach_crowdtangle_entities_from_content(content):

     # create a "CrowdTangle" user to testify that these Facebook posts are connected to the url
    crowdtangle_user = User.create_or_modify({
        '__SEARCH_BY__': 'email',
        'email': "crowdtangle@me.com",
        'password': "crowdtangle",
        'firstName': "Crowd",
        'lastName': "Tangle"
    })

    # create the Facebook platform so we can link our Facebook posts media to it:
    facebook_platform = Platform.create_or_modify({
        '__SEARCH_BY__': 'name',
        'name': 'Facebook'
    })

    shares = shares_from_url(content.url, request_start_date='2019-09-01')

    for share in shares:
        medium_group = Medium.create_or_modify({
            '__SEARCH_BY__': 'name',
            'platform': facebook_platform,
            **share['account']
        })

        content_post = Content.create_or_modify({
            '__SEARCH_BY__': 'url',
            'medium': medium_group,
            **share['post']
        })

        crowdtangle_identifier = '{}_{}_{}'.format(content.id,
                                                   content_post.crowdtangleIdentifier,
                                                   crowdtangle_user.email)

        appearance = Appearance.create_or_modify({
            '__SEARCH_BY__': 'crowdtangleIdentifier',
            'crowdtangleIdentifier': crowdtangle_identifier,
            'quotedContent': humanize(content.id),
            'quotingContent': content_post,
            'testifier': crowdtangle_user
        })
        content.quotedFromAppearances = content.quotedFromAppearances + [appearance]
