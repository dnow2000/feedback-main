import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, userId) {
  return userId || ''
}

const selectPublicationsByUserId = createCachedSelector(
  state => state.data.userArticles,
  (state, userId) => userId,
  (userArticles, userId) => userArticles.filter(userArticle =>
    userArticle.userId === userId)
)(mapArgsToCacheKey)

export default selectPublicationsByUserId
