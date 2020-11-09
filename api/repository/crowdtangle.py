from domain.crowdtangle import shares_from_url
from models.content import Content, ContentType
from models.link import Link, LinkSubType, LinkType
from models.medium import Medium
from models.platform import Platform
from models.user import User
from utils.config import DEFAULT_USER_PASSWORD, IS_DEVELOPMENT
from utils.password import create_random_password


def attach_crowdtangle_entities_from_content(content, request_start_date):

    # create a "CrowdTangle" user to testify that these Facebook posts are connected to the url
    crowdtangle_user = User.create_or_modify({
        '__SEARCH_BY__': 'email',
        'email': 'crowdtangle@sciencefeedback.co',
        'firstName': 'Crowd',
        'lastName': 'Tangle'
    })

    if not crowdtangle_user.id:
        crowdtangle_user.set_password(DEFAULT_USER_PASSWORD if IS_DEVELOPMENT else create_random_password())

    # create the Facebook platform so we can link our Facebook posts media to it:
    facebook_platform = Platform.create_or_modify({
        '__SEARCH_BY__': 'name',
        'name': 'Facebook'
    })

    shares = shares_from_url(content.url, request_start_date)

    for share in shares:
        medium_group = Medium.create_or_modify({
            '__SEARCH_BY__': 'name',
            'platform': facebook_platform,
            **share['account']
        })

        content_post = Content.create_or_modify({
            '__SEARCH_BY__': 'url',
            'medium': medium_group,
            'type': ContentType.POST,
            **share['post']
        })

        crowdtangle_identifier = '{}_{}_{}'.format(content.id,
                                                   content_post.crowdtangleIdentifier,
                                                   crowdtangle_user.id)

        link = Link.create_or_modify({
            '__SEARCH_BY__': 'crowdtangleIdentifier',
            'crowdtangleIdentifier': crowdtangle_identifier,
            'linkedContent': content,
            'linkingContent': content_post,
            'subType': LinkSubType.SHARE,
            'testifier': crowdtangle_user,
            'type': LinkType.APPEARANCE
        })
