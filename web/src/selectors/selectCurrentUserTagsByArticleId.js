import createCachedSelector from 're-reselect'

import { selectCurrentUserReviewTagsByArticleId } from './selectCurrentUserReviewTagsByArticleId'

function mapArgsToCacheKey(state, userId, articleId) {
  return `${userId || ''}/${articleId || ''}`
}

export const selectCurrentUserTagsByArticleId = createCachedSelector(
  state => state.data.tags,
  selectCurrentUserReviewTagsByArticleId,
  (tags, reviewTags) => {
    if (!reviewTags) {
      return undefined
    }
    const reviewTagIds = reviewTags.map(reviewTag => reviewTag.tagId)
    return tags.filter(tag => reviewTagIds.includes(tag.id))
  }
)(mapArgsToCacheKey)
