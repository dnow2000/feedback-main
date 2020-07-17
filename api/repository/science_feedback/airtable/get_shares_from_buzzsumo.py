from sqlalchemy_api_handler import ApiHandler

from utils.db import db
from models.content import Content
from domain.trendings.buzzsumo import buzzsumo_trending_from_url


def get_shares_from_buzzsumo():

    for content in db.session.query(Content).all():

        trending = buzzsumo_trending_from_url(content.url)

        if trending:

            trending.pop('url', None)
            trending['buzzsumoIdentifier'] = 'bs-' + str(trending['buzzsumoIdentifier'])

            content.modify(trending)
            ApiHandler.save(content)