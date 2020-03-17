import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, articleId) => articleId || ''


export default createCachedSelector(
  state => state.data.verdicts,
  (state, articleId) => articleId,
  (verdicts, articleId) =>
    verdicts && verdicts.filter(verdict => verdict.articleId === articleId)
)(mapArgsToCacheKey)
