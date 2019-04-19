import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, verdictId) {
  return verdictId || ''
}

export const selectVerdictById = createCachedSelector(
  state => state.data.verdicts,
  (state, verdictId) => verdictId,
  (verdicts, verdictId) => verdicts.find(verdict => verdict.id === verdictId)
)(mapArgsToCacheKey)

export default selectVerdictById
