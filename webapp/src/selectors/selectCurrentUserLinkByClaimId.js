import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-react-redux-login'


const mapArgsToCacheKey = (state, userId, claimId) => claimId || ''


export default createCachedSelector(
  state => state.data.apperances,
  selectCurrentUser,
  (state, claimId) => claimId,
  (apperances, currentUser, claimId) =>
    apperances && apperances.find(appearance =>
      appearance.claimId === claimId &&
      appearance.testifierId === (currentUser && currentUser.id))
)(mapArgsToCacheKey)
