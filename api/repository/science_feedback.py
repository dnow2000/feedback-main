from sqlalchemy_api_handler import ApiHandler

from domain.science_feedback import article_dict_from
from models.article import Article
from models.claim import Claim
from utils.airtable import rows_from


def article_from(article_dict):
    article = Article.query.filter_by(title=article_dict['title']).first()
    if not article:
        article = Article(**article_dict)
    else:
        article.populate_from_dict(article_dict)

    return article


def claim_from(claim_dict):
    claim = Claim.query.filter_by(title=claim_dict['text']).first()
    if not claim:
        claim = Claim(**claim_dict)
    else:
        claim.populate_from_dict(clam_content)

    return claim


def sync_articles():
    rows = [
        row
        for row in rows_from('Items for review / reviewed')
        if row['Item type'] == 'Article'
    ]

    entities = []
    for row in rows:
        entities.append(article_from(article_dict_from(row)))

    ApiHandler.save(*entities)
