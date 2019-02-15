import createCachedSelector from 're-reselect'

import { selectCurrentUserReviewByArticleId } from './selectCurrentUserReviewByArticleId'
import { selectCurrentUserTagsByArticleId } from './selectCurrentUserTagsByArticleId'

function mapArgsToCacheKey(state, userId, articleId) {
  return `${userId || ''}/${articleId || ''}`
}

export const selectCurrentUserReviewPatchByArticleId = createCachedSelector(
  selectCurrentUserReviewByArticleId,
  (state, articleId) => articleId,
  selectCurrentUserTagsByArticleId,
  (review, articleId, tags) => {

    const tagIds = tags && tags.map(tag => tag.id)

    const currentUserReviewPatch = Object.assign({
      articleId,
      tagIds
    }, review)

    return currentUserReviewPatch
  }
)(mapArgsToCacheKey)

export default selectCurrentUserReviewPatchByArticleId
