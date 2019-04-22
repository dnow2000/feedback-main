import createCachedSelector from 're-reselect'

import { selectReviewById } from './selectReviewById'
import { selectVerdictById } from './selectVerdictById'

function mapArgsToCacheKey(state, match, query) {
  return `${match.params.reviewId || ''}/${match.params.verdictId || ''}/${query.parse().articleId || ''}`
}

export const getArticleIdByMatchAndQuery = createCachedSelector(
  state => state.data.articles,
  (state, match) => selectReviewById(state, match.params.reviewId),
  (state, match) => selectVerdictById(state, match.params.verdictId),
  (state, match, query) => query.parse().articleId,
  (articles, review, verdict, articleId) =>
    (review && review.articleId) ||
    (verdict && verdict.articleId) ||
    articleId
)(mapArgsToCacheKey)

export default getArticleIdByMatchAndQuery
