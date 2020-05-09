import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, verdictId) => verdictId || ''


export default createCachedSelector(
  state => state.data.verdictReviewers,
  (state, verdictId) => verdictId,
  (verdictReviewers, verdictId) =>
    verdictReviewers && verdictReviewers.filter(verdictReviewer =>
      verdictReviewer.verdictId === verdictId)
)(mapArgsToCacheKey)
