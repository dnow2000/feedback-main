import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, articleId) {
  return articleId || ''
}

export const selectArticleById = createCachedSelector(
  state => state.data.articles,
  (state, articleId) => articleId,
  (articles, articleId) => articles.find(article => article.id === articleId)
)(mapArgsToCacheKey)

export default selectArticleById
