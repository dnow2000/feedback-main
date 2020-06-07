from sqlalchemy_api_handler import humanize

from domain.science_feedback import scrap_reviewers
from models.author_content import AuthorContent
from models.user import User
from repository.contents import content_from_url


def users_from_scrap(users_max=3):
    reviewers = scrap_reviewers(reviewers_max=users_max)
    users = []
    for reviewer in reviewers:
        user = User.create_or_modify(reviewer, search_by=['firstName', 'lastName'])
        for publication in reviewer['publications']:
            content = content_from_url(publication['url'])
            content.tags = 'isValidatedAsPeerPublication'
            author_content = AuthorContent.create_or_modify({
                'authorId': humanize(user.id),
                'contentId': humanize(content.id)
            }, search_by=['authorId', 'contentId'])
            user.authorContents = user.authorContents + [author_content]
    return users
