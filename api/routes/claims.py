from flask import current_app as app, jsonify
from sqlalchemy_api_handler import ApiHandler, \
                                   as_dict, \
                                   load_or_404

from models.claim import Claim
from utils.rest import listify


@app.route('/claims', methods=['GET'])
def get_claims():
    query = Claim.query
    return listify(Claim, query=query)


@app.route('/claims/<claim_id>', methods=['GET'])
def get_claim(claim_id):
    claim = load_or_404(Claim, claim_id)
    return jsonify(as_dict(claim)), 200
