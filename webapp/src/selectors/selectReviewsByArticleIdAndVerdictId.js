import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, articleId, verdictId) {
  return `${articleId || ''}/${verdictId || ''}`
}

const selectReviewsByArticleIdAndVerdictId = createCachedSelector(
  state => state.data.reviews,
  (state, articleId) => articleId,
  (state, articleId, verdictId) => verdictId,
  (reviews, articleId, verdictId) =>
    reviews.filter(
      review => review.articleId === articleId && review.verdictId === verdictId
    )
)(mapArgsToCacheKey)

export default selectReviewsByArticleIdAndVerdictId
