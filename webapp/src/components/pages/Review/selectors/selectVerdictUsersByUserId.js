import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, userId) => userId || ''

export default createCachedSelector(
  state => state.data.verdictReviewers,
  (state, userId) => userId,
  (verdictReviewers, userId) =>
    verdictReviewers && verdictReviewers.filter(verdictReviewer => verdictReviewer.userId === userId)
)(mapArgsToCacheKey)
