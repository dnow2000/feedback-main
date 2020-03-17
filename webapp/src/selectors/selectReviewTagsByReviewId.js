import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, reviewId) => reviewId || ''


export default createCachedSelector(
  state => state.data.reviewTags,
  (state, reviewId) => reviewId,
  (reviewTags, reviewId) =>
    reviewTags && reviewTags.filter(reviewTag =>
      reviewTag.reviewId === reviewId)
)(mapArgsToCacheKey)
