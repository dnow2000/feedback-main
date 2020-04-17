from domain.science_feedback.entity_dict_from import *
from domain.science_feedback.request_entity_rows import *

locals = locals()


def entity_dict_from(name, row):
    return locals['{}_dict_from'.format(name)](row)


def request_entity_rows(name):
    return locals['request_{}_rows'.format(name)]()
