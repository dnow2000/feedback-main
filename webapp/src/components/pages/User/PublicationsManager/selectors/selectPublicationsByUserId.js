import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, userId) {
  return userId || ''
}

const selectPublicationsByUserId = createCachedSelector(
  state => state.data.authorArticles,
  (state, userId) => userId,
  (authorArticles, userId) => authorArticles.filter(authorArticle =>
    authorArticle.userId === userId)
)(mapArgsToCacheKey)

export default selectPublicationsByUserId
