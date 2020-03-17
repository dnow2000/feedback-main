import moment from 'moment'
import { createSelector } from 'reselect'


export default createSelector(
  state => state.data.users,
  users => {
    const filteredUsers = [...users]

    filteredUsers.sort(
      (a1, a2) => moment(a2.dateCreated) - moment(a1.dateCreated)
    )

    return filteredUsers
  }
)
