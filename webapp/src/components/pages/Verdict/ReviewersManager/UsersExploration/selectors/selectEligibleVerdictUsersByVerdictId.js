import createCachedSelector from 're-reselect'

import selectUsersByVerdictId from '../../../../../../selectors/selectUsersByVerdictId'
import selectUsers from '../../../../../../selectors/selectUsers'

function mapArgsToCacheKey(state, articleId) {
  return articleId || ''
}

export const selectEligibleVerdictUsersByVerdictId = createCachedSelector(
  selectUsers,
  selectUsersByVerdictId,
  (users, verdictUsers) =>
    users.filter(user => !verdictUsers.find(verdictUser =>
      verdictUser.id === user.id))
)(mapArgsToCacheKey)

export default selectEligibleVerdictUsersByVerdictId
