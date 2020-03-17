import createCachedSelector from 're-reselect'


const mapArgsToCacheKey = (state, roleType, userId) =>
  `${roleType || ''} ${userId || ''}`


export default createCachedSelector(
  state => state.data.roles,
  (state, userId) => userId,
  (state, userId, roleType) => roleType,
  (roles, userId, roleType) =>
    roles && roles.find(role =>
      role.userId === userId && role.type === roleType)
)(mapArgsToCacheKey)
