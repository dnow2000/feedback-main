from flask_login import current_user
from flask import current_app as app, jsonify, request
from sqlalchemy_handler import Handler

from models import Review
from repository.reviews import filter_reviews_with_article_id, \
                               get_reviews_join_query, \
                               get_reviews_query_with_keywords, \
                               save_tags
from utils.includes import REVIEW_INCLUDES
from utils.rest import expect_json_data, \
                       handle_rest_get_list, \
                       load_or_404, \
                       login_or_api_key_required
from validation import check_has_role


@app.route('/reviews', methods=['GET'])
@login_or_api_key_required
def list_reviews():
    check_has_role(current_user, 'editor')

    query = Review.query

    article_id = request.args.get('articleId')
    if article_id is not None:
        query = filter_reviews_with_article_id(query, article_id)

    keywords = request.args.get('keywords')
    if keywords is not None:
        query = get_reviews_join_query(query)
        query = get_reviews_query_with_keywords(query, keywords)

    return handle_rest_get_list(Review,
                                includes=REVIEW_INCLUDES,
                                query=query,
                                page=request.args.get('page'),
                                paginate=10)

@app.route('/reviews/<review_id>', methods=['GET'])
@login_or_api_key_required
def get_review(review_id):
    review = load_or_404(Review, review_id)
    return jsonify(review.as_dict(includes=REVIEW_INCLUDES))

@app.route('/reviews', methods=['POST'])
@login_or_api_key_required
@expect_json_data
def create_review():

    check_has_role(current_user, 'reviewer')

    review = Review()
    review.populateFromDict(request.json)
    review.user = current_user

    Handler.save(review)

    save_tags(review, request.json.get('tagIds', []))

    return jsonify(review.as_dict(includes=REVIEW_INCLUDES)), 201

@app.route('/reviews/<review_id>', methods=['PATCH'])
@login_or_api_key_required
@expect_json_data
def edit_review(review_id):

    check_has_role(current_user, 'reviewer')

    review = load_or_404(Review, review_id)
    review.populateFromDict(request.json)

    Handler.save(review)

    save_tags(review, request.json.get('tagIds', []))

    return jsonify(review.as_dict(includes=REVIEW_INCLUDES)), 201
