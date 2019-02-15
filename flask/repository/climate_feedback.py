import re
from bs4 import BeautifulSoup
import requests

from models.article import Article
from models.user import User
from tests.utils import create_article, \
                        create_review, \
                        create_role, \
                        create_user, \
                        create_user_article, \
                        create_verdict
from repository.articles import resolve_content_with_url
from utils.config import EMAIL_HOST
from utils.logger import logger

def get_users_from_climate_feedback_community_scrap(users_max=3):
    result = requests.get('https://climatefeedback.org/community/')
    soup = BeautifulSoup(result.text, 'html.parser')
    users = []

    expert_rows = soup.find_all("div", class_="row expert")
    logger.info('{} expert rows and we pick {} max'.format(len(expert_rows), users_max))
    for (expert_row_index, expert_row) in enumerate(expert_rows[:users_max]):
        logger.info('user {}...'.format(expert_row_index))

        expertise_line = expert_row.find_all('p')[1].text
        if 'Expertise:' in expertise_line:
            expertise = expertise_line.split('Expertise: ')[1]
        else:
            expertise = None

        data = {
            "email": "sftest.reviewer.cf{}@{}".format(expert_row_index, EMAIL_HOST),
            "expertise": expertise,
            "external_thumb_url": expert_row.img['src'],
            "organization": expert_row.p.text.split(',')[1],
            "password": "sftest.Reviewer.cf{}".format(expert_row_index),
            "profession": expert_row.p.text.split(',')[0],
            "public_name": expert_row.h3.a.text
        }

        user = User.query.filter_by(publicName=data['public_name'])\
                         .first()

        if user:
            user.populateFromDict(data)
        else:
            user = create_user(**data)

        set_user_from_climate_feedback_user_scrap(user, expert_row.h3.a['href'])

        users.append(user)

        logger.info('create {} user...Done.'.format(expert_row_index))

    return users


def set_user_from_climate_feedback_user_scrap(user, path, store=None):

    if store is None:
        store = {}

    result = requests.get('https://climatefeedback.org{}'.format(path))
    soup = BeautifulSoup(result.text, 'html.parser')
    info = soup.find("div", class_="med-body")

    user.publicName = info.find("h2", class_="noborder").text
    paragraphs = info.find_all("p")
    situation_line = paragraphs[0].text
    user.organization = situation_line.split(",")[1]
    user.profession = situation_line.split(",")[0]

    user.external_thumb_url=soup.find("img", class_="avatar")['src']

    expertise_line = paragraphs[1].text
    if 'Expertise:' in expertise_line:
        expertise = expertise_line.split('Expertise: ')[1]
    else:
        expertise = None
    user.expertise = expertise

    orcid = info.find("a", href=re.compile("https://orcid.org/(.*)"))
    if orcid:
        user.orcidId = orcid['href'].split('https://orcid.org/')[1]

    website = info.find("a", text="Website")
    if website:
        user.websiteUrl = website['href']

    publication_image = info.find("img", alt="publication")
    if publication_image:
        publication_anchors = publication_image.parent.find_all("a")
        for publication_anchor in publication_anchors:

            data = {
                "tags": "isValidatedAsPeerPublication",
                "url": publication_anchor['href']
            }

            article = Article.query.filter_by(url=data['url'])\
                                   .first()
            if not article:
                article = create_article(**data)
                article.populateFromDict(resolve_content_with_url(article.url))
                create_user_article(user, article)


def get_articles_from_climate_feedback_feedbacks_scrap(
        articles_max=3,
        editor_user=None,
        store=None
):

    # store is an object that sets in it
    # all the currently being created objects
    # as { articles: [], ..., users: [] }
    # because we don't want to create a new user object
    # when we scrap a review article made by an already created user one.
    if store is None:
        store = { "users": [] }

    result = requests.get('https://climatefeedback.org/feedbacks')
    soup = BeautifulSoup(result.text, 'html.parser')

    articles = []

    evaluation_rows = soup.find("main").find_all("div", class_="row")
    logger.info('{} evaluation rows and we pick {} max'.format(len(evaluation_rows), articles_max))
    for (evaluation_row_index, evaluation_row) in enumerate(evaluation_rows[:articles_max]):
        logger.info('article {}...'.format(evaluation_row_index))

        evaluation_media_body = evaluation_row.find("div", class_="media-body")

        article = create_article()

        evaluation_url = evaluation_media_body.find("a")['href']
        set_article_from_climate_feedback_evaluation_scrap(
            article,
            evaluation_url,
            editor_user,
            store
        )

        articles.append(article)

    return articles

def set_article_from_climate_feedback_evaluation_scrap(
        article,
        url,
        editor_user,
        store=None
):

    if store == None:
        store = { "users": [] }

    result = requests.get(url)
    soup = BeautifulSoup(result.text, 'html.parser')

    verdict_content = soup.find('div', class_="entry-content")
    article.url = verdict_content.find('a', class_="inline-btn")['href']
    article.title = soup.find('h1', class_="entry-title").text
    article.populateFromDict(resolve_content_with_url(article.url))

    verdict_comment = verdict_content.find('p').text
    # verdict_comment += soup.find("h4", text="SUMMARY").nextSibling.text
    create_verdict(
        editor_user,
        article,
        comment=verdict_comment
    )

    content_title = soup.find('h4', text="REVIEWERS’ OVERALL FEEDBACK")
    if content_title is None:
        content_title = soup.find('h4', text="GUEST COMMENTS")
    content = content_title.parent

    reviewer_rows = soup.find('h3', text="Reviewers")\
                    .parent\
                    .find_all('div', class_="row expert-widget")



    for (reviewer_row_index, reviewer_row) in enumerate(reviewer_rows):
        logger.info('reviewer {}...'.format(reviewer_row_index))

        reviewer_anchor = reviewer_row.find('a')
        reviewer_url = reviewer_anchor['href']
        reviewer_name = reviewer_anchor.text

        logger.info('user {}...'.format(reviewer_row_index))

        already_matching_created_users = [
            user for user in store['users']
            if user.publicName == reviewer_name
        ]
        if already_matching_created_users:
            user = already_matching_created_users[0]
        else:
            user = create_user(
                email="sftest.reviewer.cf{}@{}".format(len(store['users']), EMAIL_HOST),
                password="sftest.Reviewer.cf{}".format(len(store['users'])),
            )
            set_user_from_climate_feedback_user_scrap(user, reviewer_url, store)
            store['users'].append(user)

        logger.info('role {}...'.format(reviewer_row_index))
        create_role(user, role_type='reviewer')

        logger.info('review {}...'.format(reviewer_row_index))
        review_row = content.find('a', text=reviewer_name).parent.parent
        review_row.strong.extract()
        review_comment = review_row.text
        create_review(user, article, comment=review_comment)
