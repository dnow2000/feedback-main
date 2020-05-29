import createCachedSelector from 're-reselect'

import selectCurrentUserReviewByContentId from 'selectors/selectCurrentUserReviewByContentId'


const mapArgsToCacheKey = (state, userId, contentId) =>
  `${userId || ''}/${contentId || ''}`


export default createCachedSelector(
  selectCurrentUserReviewByContentId,
  review => review && (review.reviewTags || []).map(reviewTag => reviewTag.tag)
)(mapArgsToCacheKey)
