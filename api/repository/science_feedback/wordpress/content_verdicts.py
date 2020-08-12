from sqlalchemy_api_handler import humanize

from domain.science_feedback.wordpress.feedbacks import scrap_feedbacks
from domain.science_feedback.wordpress.reviewers import reviewer_from_url
from models.user import User
from models.review import Review
from models.role import Role
from models.verdict import Verdict
from models.verdict_user import VerdictUser
from repository.contents import content_from_url


def content_verdicts_from_scrap(verdicts_max=3):
    feedbacks = scrap_feedbacks(feedbacks_max=verdicts_max)
    verdicts = []
    for feedback in feedbacks:
        verdict = Verdict.create_or_modify(feedback)
        content = content_from_url(feedback['article']['url'])
        for reviewer in verdict['reviewer']:
            reviewer = reviewer_from_url(reviewer['url'])
            user = User.create_or_modify({
                '__SEARCH_BY__': ['firstName', 'lastName'],
                **reviewer
            })
            role = Role.create_or_modify({
                '__SEARCH_BY__': ['type', 'userId'],
                'type': 'reviewer',
                'userId': humanize(user.id)
            })
            user.roles = user.roles + [role]
            review = Review.create_or_modify({
                '__SEARCH_BY__': ['contentId', 'userId'],
                'contentId': humanize(content.id),
                'userId': humanize(user.id),
                **reviewer['review']
            })
            user.reviews = user.reviews + [review]
            verdict_user = VerdictUser.create_or_modify({
                '__SEARCH_BY__': ['verdictId', 'userId'],
                'verdictId': humanize(verdict.id),
                'userId': humanize(user.id)
            })
            verdict.verdictUsers = verdict.verdictUsers + [verdict_user]
    return verdicts
