import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, type) {
  return type || ''
}

export const selectEvaluationsByType = createCachedSelector(
  state => state.data.evaluations,
  (state, type) => type,
  (evaluations, type) =>
    evaluations.filter(evaluation => evaluation.type === type)
)(mapArgsToCacheKey)

export default selectEvaluationsByType
