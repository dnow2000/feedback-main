import { selectEntityByKeyAndId } from 'redux-thunk-data'
import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, match, query) =>
  `${match.params.reviewId || ''}/${match.params.verdictId || ''}/${query.params.articleId || ''}`
  

export default createCachedSelector(
  state => state.data.articles,
  (state, match) => selectEntityByKeyAndId(state, 'reviews', match.params.reviewId),
  (state, match) => selectEntityByKeyAndId(state, 'verdicts', match.params.verdictId),
  (state, match, query) => query.params.articleId,
  (articles, review, verdict, queryArticleId) =>
    (review && review.articleId) ||
    (verdict && verdict.articleId) ||
    queryArticleId
)(mapArgsToCacheKey)
