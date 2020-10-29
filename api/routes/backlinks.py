from flask import current_app as app, jsonify, request

from domain.google import backlinks_from_url


@app.route('/backlinks')
def get_backlinks_for_url():
    url = request.args.get('url')
    count = int(request.args.get('count', 10))
    page = int(request.args.get('page', 1))
    links = backlinks_from_url(url, count=count, page=page)

    return jsonify(links)
