from flask_login import current_user
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler
from sqlalchemy_api_handler.serialization import as_dict
from sqlalchemy_api_handler.utils import dehumanize, \
                                         load_or_404

from models.review import Review
from repository.reviews import get_reviews_join_query, \
                               get_reviews_query_with_keywords, \
                               save_tags
from repository.roles import check_user_has_role
from utils.includes import REVIEW_INCLUDES
from utils.rest import expect_json_data, \
                       listify, \
                       login_or_api_key_required


@app.route('/reviews', methods=['GET'])
@login_or_api_key_required
def get_reviews():
    check_user_has_role(current_user, 'EDITOR')

    query = Review.query

    content_id = request.args.get('contentId')
    if content_id is not None:
        query = query.filter_by(contentId=dehumanize(content_id))

    keywords = request.args.get('keywords')
    if keywords is not None:
        query = get_reviews_join_query(query)
        query = get_reviews_query_with_keywords(query, keywords)

    return listify(Review,
                   includes=REVIEW_INCLUDES,
                   query=query,
                   page=request.args.get('page', 1),
                   paginate=10)


@app.route('/reviews/<review_id>', methods=['GET'])
@login_or_api_key_required
def get_review(review_id):
    review = load_or_404(Review, review_id)
    return jsonify(as_dict(review, includes=REVIEW_INCLUDES))


@app.route('/reviews', methods=['POST'])
@login_or_api_key_required
@expect_json_data
def create_review():

    check_user_has_role(current_user, 'REVIEWER')

    review = Review()
    review.modify(request.json)
    review.user = current_user

    ApiHandler.save(review)

    save_tags(review, request.json.get('tagIds', []))

    return jsonify(as_dict(review, includes=REVIEW_INCLUDES)), 201


@app.route('/reviews/<review_id>', methods=['PATCH'])
@login_or_api_key_required
@expect_json_data
def modify_review(review_id):

    check_user_has_role(current_user, 'REVIEWER')

    review = load_or_404(Review, review_id)
    review.modify(request.json)

    ApiHandler.save(review)

    save_tags(review, request.json.get('tagIds', []))

    return jsonify(as_dict(review, includes=REVIEW_INCLUDES)), 201
