import createCachedSelector from 're-reselect'

import selectVerdictUsersByVerdictId from './selectVerdictUsersByVerdictId'

function mapArgsToCacheKey(state, verdictId) {
  return verdictId || ''
}

export const selectUsersByVerdictId = createCachedSelector(
  state => state.data.users,
  selectVerdictUsersByVerdictId,
  (users, verdictUsers) => users.filter(user =>
    verdictUsers.find(verdictUser => verdictUser.userId === user.id)
  )
)(mapArgsToCacheKey)

export default selectUsersByVerdictId
