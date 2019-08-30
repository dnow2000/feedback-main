import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-react-redux-login'

function mapArgsToCacheKey(state, userId, articleId) {
  return `${userId || ''}/${articleId || ''}`
}

const selectCurrentUserVerdictByArticleId = createCachedSelector(
  state => state.data.verdicts,
  selectCurrentUser,
  (state, articleId) => articleId,
  (verdicts, user, articleId) =>
    verdicts.find(
      verdict => verdict.articleId === articleId && verdict.userId === (user && user.id)
    )
)(mapArgsToCacheKey)

export default selectCurrentUserVerdictByArticleId
