import os
import subprocess
from flask_login import current_user
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler, \
                                   as_dict, \
                                   load_or_404

from models.content import Content
from repository.contents import content_from_url, \
                                filter_contents_by_is_reviewable, \
                                get_contents_keywords_join_query, \
                                keep_contents_with_keywords, \
                                keep_contents_with_minimal_datum
from validation.contents import check_content_is_not_yet_saved
from validation.roles import check_has_role
from utils.config import API_ROOT_PATH
from utils.includes import CONTENT_INCLUDES
from utils.rest import expect_json_data, \
                       listify, \
                       login_or_api_key_required


@app.route('/contents', methods=['GET'])
@login_or_api_key_required
def get_contents():
    query = Content.query

    query = keep_contents_with_minimal_datum(query)

    reviewable = request.args.get('reviewable')
    if reviewable == 'true':
        query = filter_contents_by_is_reviewable(query, True)
    elif reviewable == 'false':
        query = filter_contents_by_is_reviewable(query, False)

    keywords = request.args.get('keywords')
    if keywords is not None:
        query = get_contents_keywords_join_query(query)
        query = keep_contents_with_keywords(query, keywords)

    return listify(Content,
                   includes=CONTENT_INCLUDES,
                   query=query,
                   page=request.args.get('page', 1),
                   paginate=os.environ.get('CONTENTS_PAGINATION', 10),
                   with_total_data_count=True)


@app.route('/contents/<content_id>', methods=['GET'])
@login_or_api_key_required
def get_content(content_id):
    content = load_or_404(Content, content_id)
    return jsonify(as_dict(content, includes=CONTENT_INCLUDES)), 200


@app.route('/contents', methods=['POST'])
@login_or_api_key_required
@expect_json_data
def create_content():

    check_has_role(current_user, 'EDITOR')

    content = content_from_url(request.json['url'])
    content.modify(**request.json)

    check_content_is_not_yet_saved(content)

    ApiHandler.save(content)

    # TODO: put it in a celery pipe
    subprocess.Popen('PYTHONPATH="." python scripts/manager.py screenshotmachine'
                     + ' --url ' + str(content.url) + ' --id ' + str(content.id),
                     shell=True,
                     cwd=API_ROOT_PATH)

    return jsonify(as_dict(content, includes=CONTENT_INCLUDES)), 201


@app.route('/contents/<content_id>', methods=['PATCH'])
@login_or_api_key_required
@expect_json_data
def modify_content(content_id):

    check_has_role(current_user, 'EDITOR')

    content = load_or_404(Content, content_id)
    content.modify(request.json)

    ApiHandler.save(content)

    return jsonify(as_dict(content, includes=CONTENT_INCLUDES)), 201


@app.route('/contents/<content_id>', methods=['DELETE'])
@login_or_api_key_required
def soft_delete_content(content_id):

    check_has_role(current_user, 'EDITOR')

    content = load_or_404(Content, content_id)
    content.soft_delete()

    ApiHandler.save(content)

    return jsonify(as_dict(content)), 201
