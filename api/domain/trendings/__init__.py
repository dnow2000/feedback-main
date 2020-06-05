import sys

from domain.trendings.buzzsumo import buzzsumo_trending_from_identifier, \
                                      find_buzzsumo_trendings

from domain.trendings.poynter import find_poynter_trendings, \
                                     load_data_frame, \
                                     poynter_trending_from_identifier


load_data_frame()


def find_claim_trendings(*args, **kwargs):
    return find_poynter_trendings(*args, **kwargs)


def find_content_trendings(*args, **kwargs):
    return find_buzzsumo_trendings(*args, **kwargs)


def claim_trending_from(*args, **kwargs):
    return poynter_trending_from_identifier(*args, **kwargs)


def content_trending_from(*args, **kwargs):
    return buzzsumo_trending_from_identifier(*args, **kwargs)


def find_trendings(trending_type, *args, **kwargs):
    return getattr(
        sys.modules[__name__],
        'find_{}_trendings'.format(trending_type)
    )(*args, **kwargs)


def trending_from(trending_type, identifier, *args, **kwargs):
    return getattr(
        sys.modules[__name__],
        '{}_trending_from'.format(trending_type)
    )(identifier, *args, **kwargs)
