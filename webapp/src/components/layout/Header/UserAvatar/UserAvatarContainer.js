import { connect } from 'react-redux'
import { selectCurrentUser } from 'with-react-redux-login'

import UserAvatar from './UserAvatar'

const mapStateToProps = state => {
  return {
    currentUser: selectCurrentUser(state),
    isMenuActive: state.menu.isActive
  }
}

export default connect(mapStateToProps)(UserAvatar)
