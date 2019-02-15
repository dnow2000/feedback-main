import createCachedSelector from 're-reselect'

import { selectCurrentUserReviewByArticleId } from './selectCurrentUserReviewByArticleId'

function mapArgsToCacheKey(state, userId, articleId) {
  return `${userId || ''}/${articleId || ''}`
}

export const selectCurrentUserReviewTagsByArticleId = createCachedSelector(
  state => state.data.reviewTags,
  selectCurrentUserReviewByArticleId,
  (reviewTags, review) => review && reviewTags.filter(reviewTag =>
    reviewTag.reviewId === review.id)
)(mapArgsToCacheKey)
