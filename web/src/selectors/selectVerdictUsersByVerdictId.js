import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, verdictId) {
  return verdictId || ''
}

export const selectVerdictUsersByVerdictId = createCachedSelector(
  state => state.data.verdictUsers,
  (state, verdictId) => verdictId,
  (verdictUsers, verdictId) =>
    verdictUsers.filter(verdictUser => verdictUser.verdictId === verdictId)
)(mapArgsToCacheKey)

export default selectVerdictUsersByVerdictId
