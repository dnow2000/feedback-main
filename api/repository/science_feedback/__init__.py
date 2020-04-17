import os
from sqlalchemy_api_handler import ApiHandler

from domain.science_feedback import entity_dict_from, \
                                    request_entity_rows
from repository.science_feedback.entity_from import *
from domain.science_feedback.request_entity_rows import *

locals = locals()


def entity_from(name, entity_dict):
    return locals['{}_from'.format(name)](entity_dict)


def sync(name):
    rows = request_entity_rows(name)

    entities = []
    for row in rows:
        entity_dict = entity_dict_from(name, row)
        entity = entity_from(name, entity_dict)
        entities.append(entity)

    ApiHandler.save(*entities)


def sync_all():
    for name in ['reviewer', 'article', 'claim']:
        sync(name)
