import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, userId) {
  return userId || ''
}

const selectUserTagsByUserId = createCachedSelector(
  state => state.data.userTags,
  (state, userId) => userId,
  (userTags, userId) =>
    userTags.filter(userTag => userTag.userId === userId)
)(mapArgsToCacheKey)

export default selectUserTagsByUserId
