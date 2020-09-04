from datetime import datetime

from domain.crowdtangle import shares_from_url
from sqlalchemy_api_handler import ApiHandler, humanize
from models.appearance import Appearance
from models.content import Content
from models.medium import Medium
from models.platform import Platform
from models.user import User


def sync_from_content(content):

     # create a "CrowdTangle" user to testify that these Facebook posts are connected to the url
    crowdtangle_user = User.create_or_modify({
        '__SEARCH_BY__': 'email',
        'email': "crowdtangle@me.com",
        'password': "crowdtangle",
        'firstName': "Crowd",
        'lastName': "Tangle"
    })
    ApiHandler.save(crowdtangle_user)

    # create the Facebook platform so we can link our Facebook posts media to it:
    facebook_platform = Platform.create_or_modify({
        '__SEARCH_BY__': 'name',
        'name': 'Facebook'
    })
    ApiHandler.save(facebook_platform)

    shares = shares_from_url(content.url, request_start_date='2019-09-01')

    print('The URL was shared {} times on Facebook'.format(len(shares)))

    for share in shares:
        # save the Facebook group as a medium:
        medium_group = Medium.create_or_modify({
            '__SEARCH_BY__': 'name',
            'logoUrl': share['group']['logoUrl'],
            'name': share['group']['name'],
            'url': share['group']['url'],
            'platform': facebook_platform
        })  
        ApiHandler.save(medium_group)

        # save the Facebook post as a content:
        content_post = Content.create_or_modify({  
            '__SEARCH_BY__': 'url',
            'medium': medium_group,
            'publishedDate': datetime.strptime(share['post']['publishedDate'], '%Y-%m-%d %H:%M:%S'),
            'url': share['post']['url'],
        })
        appearance = Appearance.create_or_modify({
            '__SEARCH_BY__': [  'quotedContentId',   'quotingContentId', 'testifierId'],
            'quotedContentId': humanize(content.id),
            'quotingContentId': humanize(content_post.id),
            'testifierId': humanize(crowdtangle_user.id)
        })    
        ApiHandler.save(appearance)