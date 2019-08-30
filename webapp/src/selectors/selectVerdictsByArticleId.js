import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, articleId) {
  return articleId || ''
}

const selectVerdictsByArticleId = createCachedSelector(
  state => state.data.verdicts,
  (state, articleId) => articleId,
  (verdicts, articleId) =>
    verdicts.filter(verdict => verdict.articleId === articleId)
)(mapArgsToCacheKey)

export default selectVerdictsByArticleId
