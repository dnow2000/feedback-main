import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, type) =>
  type || ''


export default createCachedSelector(
  state => state.data.evaluations,
  (state, type) => type,
  (evaluations, type) => {
    if (!evaluations) return
    const filteredEvaluations = evaluations.filter(evaluation =>
      evaluation.type === type)
    filteredEvaluations.sort((e1, e2) => e1.value >= e2.value)
    return filteredEvaluations
})(mapArgsToCacheKey)
