import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, articleId, verdictId) =>
  `${articleId || ''}/${verdictId || ''}`
  

export default createCachedSelector(
  state => state.data.reviews,
  (state, articleId) => articleId,
  (state, articleId, verdictId) => verdictId,
  (reviews, articleId, verdictId) =>
    reviews && reviews.filter(review =>
      review.articleId === articleId && review.verdictId === verdictId)
)(mapArgsToCacheKey)
