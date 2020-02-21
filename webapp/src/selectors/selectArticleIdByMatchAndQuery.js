import { selectEntityByKeyAndId } from 'redux-thunk-data'
import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, match, query) {
  return `${match.params.reviewId || ''}/${match.params.verdictId || ''}/${query.params.articleId || ''}`
}

export const selectArticleIdByMatchAndQuery = createCachedSelector(
  state => state.data.articles,
  (state, match) => selectEntityByKeyAndId(state, 'reviews', match.params.reviewId),
  (state, match) => selectEntityByKeyAndId(state, 'verdicts', match.params.verdictId),
  (state, match, query) => query.params.articleId,
  (articles, review, verdict, articleId) =>
    (review && review.articleId) ||
    (verdict && verdict.articleId) ||
    articleId
)(mapArgsToCacheKey)

export default selectArticleIdByMatchAndQuery
