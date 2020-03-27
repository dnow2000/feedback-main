import sys

from domain.trendings.buzzsumo import find_buzzsumo_trendings, \
                                      get_buzzsumo_trending
from domain.trendings.poynter import find_poynter_trendings, \
                                     get_poynter_trending


def find_article_trendings(*args, **kwargs):
    return find_buzzsumo_trendings(*args, **kwargs)


def find_claim_trendings(*args, **kwargs):
    return find_poynter_trendings(*args, **kwargs)


def get_article_trending(*args, **kwargs):
    return get_buzzsumo_trending(*args, **kwargs)


def get_claim_trending(*args, **kwargs):
    return get_poynter_trending(*args, **kwargs)


def find_trendings(trending_type, *args, **kwargs):
    return getattr(
        sys.modules[__name__],
        'find_{}_trendings'.format(trending_type)
    )(*args, **kwargs)


def get_trending(trending_type, *args, **kwargs):
    return getattr(
        sys.modules[__name__],
        'get_{}_trendings'.format(trending_type)
    )(*args, **kwargs)
