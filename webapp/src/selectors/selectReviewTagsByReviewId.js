import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, reviewId) {
  return reviewId || ''
}

const selectReviewTagsByReviewId = createCachedSelector(
  state => state.data.reviewTags,
  (state, reviewId) => reviewId,
  (reviewTags, reviewId) =>
    reviewTags.filter(reviewTag => reviewTag.reviewId === reviewId)
)(mapArgsToCacheKey)

export default selectReviewTagsByReviewId
