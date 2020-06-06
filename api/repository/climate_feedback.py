from sqlalchemy_api_handler import humanize, logger

from domain.climate_feedback.feedbacks import scrap_feedbacks, reviewer_from_url
from domain.climate_feedback.reviewers import scrap_reviewers
from models.author_content import AuthorContent
from models.review import Review
from models.role import Role
from models.user import User
from models.verdict import Verdict
from models.verdict_user import VerdictUser
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

def verdicts_from_scrap(verdicts_max=3):
    feedbacks = scrap_feedbacks(feedbacks_max=verdicts_max)
    verdicts = []
    for feedback in feedbacks:
        verdict = Verdict.create_or_modify(feedback, search_by=[])
        content = content_from_url(feedback['article']['url'])
        for reviewer in verdict['reviewer']:
            reviewer = reviewer_from_url(reviewer['url'])
            user = User.create_or_modify(reviewer, search_by=['firstName', 'lastName'])
            role = Role.create_or_modify({
                'type': 'reviewer',
                'userId': humanize(user.id)
            }, search_by=['type', 'userId'])
            user.roles = user.roles + [role]
            review = Review.create_or_modify({
                'contentId': humanize(content.id),
                'userId': humanize(user.id),
                **reviewer['review']
            }, search_by=['contentId', 'userId'])
            user.reviews = user.reviews + [review]
            verdict_user = VerdictUser.create_or_modify({
                'verdictId': humanize(verdict.id),
                'userId': humanize(user.id)
            }, search_by=['verdictId', 'userId'])
            verdict.verdictUsers = verdict.verdictUsers + [verdict_user]
    return verdicts
