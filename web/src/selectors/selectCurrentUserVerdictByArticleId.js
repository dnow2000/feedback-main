import { selectCurrentUser } from 'pass-culture-shared'
import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, userId, articleId) {
  return `${userId || ''}/${articleId || ''}`
}

export const selectCurrentUserVerdictByArticleId = createCachedSelector(
  state => state.data.verdicts,
  selectCurrentUser,
  (state, articleId) => articleId,
  (verdicts, user, articleId) =>
    verdicts.find(
      verdict => verdict.articleId === articleId && verdict.userId === (user && user.id)
    )
)(mapArgsToCacheKey)

export default selectCurrentUserVerdictByArticleId
