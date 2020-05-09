import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-react-redux-login'


const mapArgsToCacheKey = (state, sceneId) => sceneId


export default createCachedSelector(
  state => state.data.verdicts,
  selectCurrentUser,
  (state, sceneId) => sceneId,
  (verdicts, currentUser, sceneId) =>
    verdicts && verdicts.find(verdict =>
      verdict.sceneId === sceneId &&
      verdict.editorId === (currentUser && currentUser.id))
)(mapArgsToCacheKey)
