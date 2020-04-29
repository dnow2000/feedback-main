import domain.science_feedback.request_entity_airtable_rows


def request_airtable_rows_for(name, max_records=None):
    function_name = 'request_{}_airtable_rows'.format(name)
    request_entity_airtable_rows_function = getattr(domain.science_feedback.request_entity_airtable_rows, function_name)
    return request_entity_airtable_rows_function(max_records=max_records)
