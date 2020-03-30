from flask import current_app as app, jsonify, request

from domain.orcid import record_from_orcid_id


@app.route('/orcid/<orcid_id>')
def get_orcid(orcid_id):
    
    content = record_from_orcid_id(orcid_id)
    # content = { "publication1": "foo" }

    return jsonify(content)
