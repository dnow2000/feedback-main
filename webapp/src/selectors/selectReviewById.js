import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, reviewId) {
  return reviewId || ''
}

const selectReviewById = createCachedSelector(
  state => state.data.reviews,
  (state, reviewId) => reviewId,
  (reviews, reviewId) => reviews.find(review => review.id === reviewId)
)(mapArgsToCacheKey)

export default selectReviewById
