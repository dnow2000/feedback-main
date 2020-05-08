from flask import current_app as app, jsonify, request

from domain.orcid import get_publications_from_orcid_id

# SOME ORCID IDs TO TRY
# Me (0 works):                        '0000-0002-8972-9425'
# Sophie Bavard (2 works):             '0000-0002-9283-2976'
# Emma J.D. Boland (4  works):         '0000-0003-2430-7763'
# Manu (16 works):                     '0000-0003-4529-5490'
# Linden Ashcroft (17 works):          '0000-0003-3898-6648'
# Ailie Gallant (24 works):            '0000-0002-7917-1069'
# error 404 :                          '0000-0003-4529-5491'
# other error 404 :                    '123'

@app.route('/orcid/<orcid_id>')
def get_orcid(orcid_id):

    publications = get_publications_from_orcid_id(orcid_id)

    return jsonify(publications)
