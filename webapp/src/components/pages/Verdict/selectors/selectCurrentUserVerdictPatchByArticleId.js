import createCachedSelector from 're-reselect'

import selectCurrentUserVerdictByArticleId from '../../../../selectors/selectCurrentUserVerdictByArticleId'

function mapArgsToCacheKey(state, userId, articleId) {
  return `${userId || ''}/${articleId || ''}`
}

const selectCurrentUserVerdictPatchByArticleId = createCachedSelector(
  selectCurrentUserVerdictByArticleId,
  (state, articleId) => articleId,
  (verdict, articleId) => Object.assign({ articleId }, verdict)
)(mapArgsToCacheKey)

export default selectCurrentUserVerdictPatchByArticleId
