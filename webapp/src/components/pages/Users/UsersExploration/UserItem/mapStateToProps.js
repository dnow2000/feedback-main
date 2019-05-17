import { selectCurrentUser } from 'with-react-redux-login'
import {
  selectRoleByUserIdAndType,
  selectTagsByUserId
} from '../../../../../selectors'


function mapStateToProps (state, ownProps) {
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

export default mapStateToProps
