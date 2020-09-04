from datetime import datetime

from sqlalchemy_api_handler import ApiHandler
from models.appearance import Appearance
from models.content import Content
from models.medium import Medium
from models.user import User


def save_crowdtangle_data(response, content):

    user_crowdtangle = User(
        email="crowdtangle@me.com",
        password="crowdtangle",
        firstName="Crowd",
        lastName="Tangle"
    )
    ApiHandler.save(user_crowdtangle)

    for share in response['shares']:
        # save the Facebook group as a medium
        medium_group = Medium(
            name=share['group']['name'],
            url=share['group']['url'],
            logoUrl=share['group']['logoUrl']
        )  
        ApiHandler.save(medium_group)


        # save the Facebook post as a content
        content_post = Content(
            url=share['post']['url'],
            publishedDate=datetime.strptime(share['post']['publishedDate'], '%Y-%m-%d %H:%M:%S'),
            medium=medium_group
        )
        appearance = Appearance(
            quotedContent=content,
            quotingContent=content_post,
            testifier=user_crowdtangle
        )    
        ApiHandler.save(appearance)