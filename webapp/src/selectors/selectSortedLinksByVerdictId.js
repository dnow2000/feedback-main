import createCachedSelector from 're-reselect'
import { selectEntitiesByKeyAndJoin, selectEntityByKeyAndId } from 'redux-thunk-data'
import { selectCurrentUser } from 'with-react-redux-login'


const mapArgsToCacheKey = (state, verdictId) => verdictId || ''


export default createCachedSelector(
  selectCurrentUser,
  (state, verdictId) => selectEntitiesByKeyAndJoin(
    state,
    'links',
    { key: 'linkedClaimId', value: selectEntityByKeyAndId(state, 'verdicts', verdictId)?.claimId }),
  (currentUser, links) => {
    if (!links) return
    links.sort((l1, l2) => l1.id > l2.id ? -1 : 1)
    if (currentUser) {
      links.sort((l1,l2) =>
        l1.testifierId === currentUser.id &&
        l2.testifierId !== currentUser.id
        ? -1 : 1)
    }
    return links
  })(mapArgsToCacheKey)
