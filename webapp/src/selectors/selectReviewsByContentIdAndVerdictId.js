import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, contentId, verdictId) =>
  `${contentId || ''}/${verdictId || ''}`


export default createCachedSelector(
  state => state.data.reviews,
  (state, contentId) => contentId,
  (state, contentId, verdictId) => verdictId,
  (reviews, contentId, verdictId) =>
    reviews && reviews.filter(review =>
      review.contentId === contentId && review.verdictId === verdictId)
)(mapArgsToCacheKey)
