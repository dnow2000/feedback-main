import createCachedSelector from 're-reselect'

import { selectCurrentUserVerdictByArticleId } from './selectCurrentUserVerdictByArticleId'

function mapArgsToCacheKey(state, userId, articleId) {
  return `${userId || ''}/${articleId || ''}`
}

export const selectCurrentUserVerdictPatchByArticleId = createCachedSelector(
  selectCurrentUserVerdictByArticleId,
  (state, articleId) => articleId,
  (verdict, articleId) => Object.assign({ articleId }, verdict)
)(mapArgsToCacheKey)

export default selectCurrentUserVerdictPatchByArticleId
