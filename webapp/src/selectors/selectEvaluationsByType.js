import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, type) {
  return type || ''
}

const selectEvaluationsByType = createCachedSelector(
  state => state.data.evaluations,
  (state, type) => type,
  (evaluations, type) => {
    const filteredEvaluations = evaluations.filter(evaluation =>
      evaluation.type === type)
    filteredEvaluations.sort((e1, e2) => e1.value >= e2.value)
    return filteredEvaluations
})(mapArgsToCacheKey)

export default selectEvaluationsByType
