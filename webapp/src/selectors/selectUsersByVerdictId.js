import createCachedSelector from 're-reselect'

import selectVerdictUsersByVerdictId from './selectVerdictUsersByVerdictId'


const mapArgsToCacheKey = (state, verdictId) => verdictId || ''

export default createCachedSelector(
  state => state.data.users,
  selectVerdictUsersByVerdictId,
  (users, verdictUsers) => users && users.filter(user =>
    verdictUsers.find(verdictUser =>
      verdictUser.userId === user.id))
)(mapArgsToCacheKey)
