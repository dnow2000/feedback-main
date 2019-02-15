import createCachedSelector from 're-reselect'

import { selectUserById } from './selectUserById'

function mapArgsToCacheKey(state, roleType, userId) {
  return `${roleType || ''} ${userId || ''}`
}

export const selectRoleByUserIdAndType = createCachedSelector(
  selectUserById,
  (state, userId, roleType) => roleType,
  (user, roleType) =>
    (user && user.roles || []).find(role => role.type === roleType)
)(mapArgsToCacheKey)

export default selectRoleByUserIdAndType
