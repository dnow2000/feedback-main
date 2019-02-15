import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, articleId) {
  return articleId || ''
}

export const selectReviewsByArticleId = createCachedSelector(
  state => state.data.reviews,
  (state, articleId) => articleId,
  (reviews, articleId) =>
    reviews.filter(
      review => review.articleId === articleId
    )
)(mapArgsToCacheKey)

export default selectReviewsByArticleId
