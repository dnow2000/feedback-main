import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { selectCurrentUser } from 'with-react-redux-login'

import selectRoleByUserIdAndType from 'selectors/selectRoleByUserIdAndType'
import selectTagsByUserId from 'selectors/selectTagsByUserId'

import UserItem from './UserItem'


const mapStateToProps = (state, ownProps) => {
  const { user } = ownProps
  const { id: userId } = (user || {})
  const currentUser = selectCurrentUser(state)
  const { id: currentUserId } = currentUser || {}

  const adminRole = selectRoleByUserIdAndType(state, currentUserId, 'admin')

  return {
    adminRole,
    tags: selectTagsByUserId(state, userId)
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(UserItem)
