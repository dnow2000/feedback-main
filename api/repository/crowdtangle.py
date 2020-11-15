from sqlalchemy_api_handler import ApiHandler

from domain.crowdtangle import shares_from_url
from utils.config import DEFAULT_USER_PASSWORD, IS_DEVELOPMENT
from utils.password import create_random_password


def share_appearances_from_content(content, request_start_date=None):
    Content = ApiHandler.model_from_name('Content')
    Link = ApiHandler.model_from_name('Link')
    Medium = ApiHandler.model_from_name('Medium')
    Platform = ApiHandler.model_from_name('Platform')
    User = ApiHandler.model_from_name('User')

    # create a "CrowdTangle" user to testify that these Facebook posts are connected to the url
    crowdtangle_user = User.create_or_modify({
        '__SEARCH_BY__': 'email',
        'email': 'crowdtangle@sciencefeedback.co',
        'firstName': 'Crowd',
        'lastName': 'Tangle'
    })

    if not crowdtangle_user.id:
        crowdtangle_user.set_password(DEFAULT_USER_PASSWORD \
                                      if IS_DEVELOPMENT else create_random_password())

    # create the Facebook platform so we can link our Facebook posts media to it:
    facebook_platform = Platform.create_or_modify({
        '__SEARCH_BY__': 'name',
        'name': 'Facebook'
    })

    shares = shares_from_url(content.url, request_start_date=request_start_date)

    links = []
    for share in shares:
        medium_group = Medium.create_or_modify({
            '__SEARCH_BY__': 'name',
            'platform': facebook_platform,
            **share['account']
        })

        content_post = Content.create_or_modify({
            '__SEARCH_BY__': 'url',
            'medium': medium_group,
            'type': Content.ContentType.POST,
            **share['post']
        })

        crowdtangle_identifier = '{}_{}_{}'.format(content.id,
                                                   content_post.crowdtangleIdentifier,
                                                   crowdtangle_user.id)

        links.append(Link.create_or_modify({
            '__SEARCH_BY__': 'crowdtangleIdentifier',
            'crowdtangleIdentifier': crowdtangle_identifier,
            'linkedContent': content,
            'linkingContent': content_post,
            'subType': Link.LinkSubType.SHARE,
            'testifier': crowdtangle_user,
            'type': Link.LinkType.APPEARANCE
        }))

    return links
