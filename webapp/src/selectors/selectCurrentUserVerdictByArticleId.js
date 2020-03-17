import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-react-redux-login'


const mapArgsToCacheKey = (state, userId, articleId) =>
  `${userId || ''}/${articleId || ''}`
  

export default createCachedSelector(
  state => state.data.verdicts,
  selectCurrentUser,
  (state, articleId) => articleId,
  (verdicts, user, articleId) =>
    verdicts && verdicts.find(
      verdict => verdict.articleId === articleId && verdict.userId === (user && user.id)
    )
)(mapArgsToCacheKey)
