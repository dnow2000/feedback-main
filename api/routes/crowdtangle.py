from flask import current_app as app, jsonify

from domain.trendings.crowdtangle import facebook_shares_from_crowdtangle

@app.route('/crowdtangle')
def get_facebook_shares_from_crowdtangle():

    facebook_accounts = facebook_shares_from_crowdtangle()

    return jsonify(facebook_accounts)