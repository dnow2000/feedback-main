import createCachedSelector from 're-reselect'
import { selectEntitiesByKeyAndJoin, selectEntityByKeyAndId } from 'redux-thunk-data'
import { selectCurrentUser } from 'with-react-redux-login'


const mapArgsToCacheKey = (state, verdictId) => verdictId || ''


export default createCachedSelector(
  selectCurrentUser,
  (state, verdictId) => selectEntitiesByKeyAndJoin(
    state,
    'appearances',
    { key: 'quotedClaimId', value: selectEntityByKeyAndId(state, 'verdicts', verdictId)?.claimId }),
  (currentUser, appearances) => {
    if (!appearances) return
    appearances.sort((a1, a2) => a1.id > a2.id ? -1 : 1)
    if (currentUser) {
      appearances.sort((a1,a2) =>
        a1.testifierId === currentUser.id &&
        a2.testifierId !== currentUser.id
        ? -1 : 1)
    }
    return appearances
  })(mapArgsToCacheKey)
