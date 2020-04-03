from flask import current_app as app, jsonify, request

from domain.orcid import record_from_orcid_id


@app.route('/orcid/<orcid_id>')
def get_orcid(orcid_id):
    
    content = record_from_orcid_id(orcid_id)
    # content = { "publication1": "foo" }
    # content = {
    #     'publication1': 'https://doi.org/10.1038/s41562-019-0681-8', 
    #     'publication2': 'https://doi.org/10.1038/s41467-018-06781-2'
    #     }

    return jsonify(content)
