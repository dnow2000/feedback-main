import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, userId) {
  return userId || ''
}

export const selectVerdictUsersByUserId = createCachedSelector(
  state => state.data.verdictUsers,
  (state, userId) => userId,
  (verdictUsers, userId) =>
    verdictUsers.filter(verdictUser => verdictUser.userId === userId)
)(mapArgsToCacheKey)

export default selectVerdictUsersByUserId
