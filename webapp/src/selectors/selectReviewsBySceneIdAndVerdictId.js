import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, sceneId, verdictId) =>
  `${sceneId || ''}/${verdictId || ''}`


export default createCachedSelector(
  state => state.data.reviews,
  (state, sceneId) => sceneId,
  (state, sceneId, verdictId) => verdictId,
  (reviews, sceneId, verdictId) =>
    reviews && reviews.filter(review =>
      review.sceneId === sceneId && review.verdictId === verdictId)
)(mapArgsToCacheKey)
