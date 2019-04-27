import createCachedSelector from 're-reselect'

import { selectCurrentUserReviewByArticleId } from '../../../selectors/selectCurrentUserReviewByArticleId'

function mapArgsToCacheKey(state, userId, articleId) {
  return `${userId || ''}/${articleId || ''}`
}

const selectCurrentUserTagsByArticleId = createCachedSelector(
  selectCurrentUserReviewByArticleId,
  review => review && (review.reviewTags || []).map(reviewTag => reviewTag.tag)
)(mapArgsToCacheKey)

export default selectCurrentUserTagsByArticleId
