import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, roleType, userId) {
  return `${roleType || ''} ${userId || ''}`
}

export const selectRoleByUserIdAndType = createCachedSelector(
  state => state.data.roles,
  (state, userId) => userId,
  (state, userId, roleType) => roleType,
  (roles, userId, roleType) =>
    roles.find(role => role.userId === userId && role.type === roleType)
)(mapArgsToCacheKey)

export default selectRoleByUserIdAndType
