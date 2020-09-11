from flask import current_app as app, jsonify

from domain.trendings.buzzsumo import shares_from_buzzsumo_url

# # Some trending buzzsumo ids to try:
# 6563519109
# 6563656629
# 6567172163
# 6567777473
# 6563213154
# 6568557517
# 6568237416
# 6568741746
# 6568581609
# 6568590870
# 6566924432
# 6563493816
# 6562839509
# 6563481410


@app.route('/test_buzzsumo_id/<buzzsumo_id>')
def get_shares_from_buzzsumo_url(buzzsumo_id):

    shares = shares_from_buzzsumo_url(buzzsumo_id)

    return jsonify(shares)
