import get from 'lodash.get'
import createCachedSelector from 're-reselect'

import { selectUserById } from './selectUserById'

function mapArgsToCacheKey(state, userId) {
  return userId || ''
}

export const selectReviewerRoleByUserId = createCachedSelector(
  selectUserById,
  user => get(user, 'roles', []).find(role => role.type === 'reviewer')
)(mapArgsToCacheKey)

export default selectReviewerRoleByUserId
