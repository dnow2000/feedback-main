import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, userId) {
  return userId || ''
}

const selectUserById = createCachedSelector(
  state => state.data.users,
  (state, userId) => userId,
  (users, userId) => users.find(user => user.id === userId)
)(mapArgsToCacheKey)

export default selectUserById
