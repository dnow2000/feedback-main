import createCachedSelector from 're-reselect'

import selectVerdictsByArticleId from 'selectors/selectVerdictsByArticleId'

import selectVerdictReviewersByUserId from './selectVerdictReviewersByUserId'


const mapArgsToCacheKey = (state, articleId) => articleId || ''

export default createCachedSelector(
  selectVerdictsByArticleId,
  (state, articleId, userId) => selectVerdictReviewersByUserId(state, userId),
  (verdicts, verdictReviewers) =>
    verdicts && verdicts.filter(verdict =>
      verdictReviewers.find(verdictReviewer =>
        verdictReviewer.verdictId === verdict.id))
)(mapArgsToCacheKey)
