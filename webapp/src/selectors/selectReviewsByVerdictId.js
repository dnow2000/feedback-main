import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, verdictId) {
  return verdictId || ''
}

export default createCachedSelector(
  state => state.data.reviews,
  (state, verdictId) => verdictId,
  (reviews, verdictId) =>
    reviews.filter(
      review => review.verdictId === verdictId
    )
)(mapArgsToCacheKey)
