import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, articleId, userId) {
  return `${articleId || ''}/${userId || ''}`
}

export const selectReviewByArticleIdAndUserId = createCachedSelector(
  state => state.data.reviews,
  (state, articleId) => articleId,
  (state, articleId, userId) => userId,
  (reviews, articleId, userId) =>
    reviews.find(
      review => review.articleId === articleId && review.userId === userId
    )
)(mapArgsToCacheKey)

export default selectReviewByArticleIdAndUserId
