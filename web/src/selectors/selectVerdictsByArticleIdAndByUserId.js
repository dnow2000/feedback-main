import createCachedSelector from 're-reselect'

import { selectVerdictsByArticleId } from './selectVerdictsByArticleId'
import { selectVerdictUsersByUserId } from './selectVerdictUsersByUserId'

function mapArgsToCacheKey(state, articleId) {
  return articleId || ''
}

export const selectVerdictsByArticleIdAndByUserId = createCachedSelector(
  selectVerdictsByArticleId,
  (state, articleId, userId) => selectVerdictUsersByUserId(state, userId),
  (verdicts, verdictUsers) =>
    verdicts.filter(verdict => verdictUsers.find(verdictUser =>
      verdictUser.verdictId === verdict.id))
)(mapArgsToCacheKey)

export default selectVerdictsByArticleIdAndByUserId
