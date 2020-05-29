import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-react-redux-login'


const mapArgsToCacheKey = (state, contentId) => contentId


export default createCachedSelector(
  state => state.data.verdicts,
  selectCurrentUser,
  (state, contentId) => contentId,
  (verdicts, currentUser, contentId) =>
    verdicts && verdicts.find(verdict =>
      verdict.contentId === contentId &&
      verdict.editorId === (currentUser && currentUser.id))
)(mapArgsToCacheKey)
