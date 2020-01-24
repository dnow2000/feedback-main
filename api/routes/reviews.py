from flask_login import current_user
from flask import current_app as app, jsonify, request
from sqlalchemy_api_handler import ApiHandler, \
                                   as_dict, \
                                   load_or_404

from models.review import Review
from repository.reviews import filter_reviews_with_article_id, \
                               get_reviews_join_query, \
                               get_reviews_query_with_keywords, \
                               save_tags
from routes.utils.includes import REVIEW_INCLUDES
from utils.rest import expect_json_data, \
                       listify, \
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

    return listify(Review,
                   includes=REVIEW_INCLUDES,
                   query=query,
                   page=request.args.get('page'),
                   paginate=10)

@app.route('/reviews/<review_id>', methods=['GET'])
@login_or_api_key_required
def get_review(review_id):
    review = load_or_404(Review, review_id)
    return jsonify(as_dict(review, includes=REVIEW_INCLUDES))

@app.route('/reviews', methods=['POST'])
@login_or_api_key_required
@expect_json_data
def Review():

    check_has_role(current_user, 'reviewer')

    review = Review()
    review.populate_from_dict(request.json)
    review.user = current_user

    ApiHandler.save(review)

    save_tags(review, request.json.get('tagIds', []))

    return jsonify(as_dict(review, includes=REVIEW_INCLUDES)), 201

@app.route('/reviews/<review_id>', methods=['PATCH'])
@login_or_api_key_required
@expect_json_data
def edit_review(review_id):

    check_has_role(current_user, 'reviewer')

    review = load_or_404(Review, review_id)
    review.populate_from_dict(request.json)

    ApiHandler.save(review)

    save_tags(review, request.json.get('tagIds', []))

    return jsonify(as_dict(review, includes=REVIEW_INCLUDES)), 201
