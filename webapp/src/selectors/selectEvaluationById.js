import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, evaluationId) {
  return evaluationId || ''
}

export const selectEvaluationById = createCachedSelector(
  state => state.data.evaluations,
  (state, evaluationId) => evaluationId,
  (evaluations, evaluationId) =>
    evaluations.find(evaluation => evaluation.id === evaluationId)
)(mapArgsToCacheKey)

export default selectEvaluationById
