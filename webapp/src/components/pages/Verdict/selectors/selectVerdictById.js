import { createSelector } from 'reselect'

export default createSelector(
  state => state.data.verdicts,
  (state, verdictId) => verdictId,
  (verdicts, verdictId) => verdicts.find(verdict => verdict.id === verdictId)
)
