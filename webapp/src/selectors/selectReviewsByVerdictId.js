import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, verdictId) => verdictId || ''


export default createCachedSelector(
  state => state.data.reviews,
  (state, verdictId) => verdictId,
  (reviews, verdictId) =>
    reviews && reviews.filter(review =>
      review.verdictId === verdictId)
)(mapArgsToCacheKey)
