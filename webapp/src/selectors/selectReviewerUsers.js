import get from 'lodash.get'
import { createSelector } from 'reselect'

const selectReviewerUsers = createSelector(
  state => state.data.users,
  users =>
    users.filter(user =>
      get(user, 'roles', []).find(role => role.type === 'reviewer')
    )
)

export default selectReviewerUsers
