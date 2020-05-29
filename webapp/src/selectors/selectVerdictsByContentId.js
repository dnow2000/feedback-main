import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, contentId) => contentId || ''


export default createCachedSelector(
  state => state.data.verdicts,
  (state, contentId) => contentId,
  (verdicts, contentId) =>
    verdicts && verdicts.filter(verdict => verdict.contentId === contentId)
)(mapArgsToCacheKey)
