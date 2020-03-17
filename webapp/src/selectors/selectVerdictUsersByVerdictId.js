import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, verdictId) => verdictId || ''


export default createCachedSelector(
  state => state.data.verdictUsers,
  (state, verdictId) => verdictId,
  (verdictUsers, verdictId) =>
    verdictUsers && verdictUsers.filter(verdictUser =>
      verdictUser.verdictId === verdictId)
)(mapArgsToCacheKey)
