from domain.science_feedback.request_entity_rows import *

locals = locals()

def request_entity_rows(name, max_records=None):
    return locals['request_{}_rows'.format(name)](max_records=max_records)
