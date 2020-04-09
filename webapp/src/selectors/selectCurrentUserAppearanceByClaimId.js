import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-react-redux-login'


const mapArgsToCacheKey = (state, userId, claimId) =>
  `${userId || ''}/${claimId || ''}`


export default createCachedSelector(
  state => state.data.apperances,
  selectCurrentUser,
  (state, claimId) => claimId,
  (apperances, user, claimId) =>
    apperances && apperances.find(appearance =>
      appearance.claimId === claimId && appearance.userId === (user && user.id))
)(mapArgsToCacheKey)
