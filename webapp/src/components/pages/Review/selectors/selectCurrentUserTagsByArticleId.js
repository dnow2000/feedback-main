import createCachedSelector from 're-reselect'

import selectCurrentUserReviewByArticleId from 'selectors/selectCurrentUserReviewByArticleId'


const mapArgsToCacheKey = (state, userId, articleId) =>
  `${userId || ''}/${articleId || ''}`


export default createCachedSelector(
  selectCurrentUserReviewByArticleId,
  review => review && (review.reviewTags || []).map(reviewTag => reviewTag.tag)
)(mapArgsToCacheKey)
