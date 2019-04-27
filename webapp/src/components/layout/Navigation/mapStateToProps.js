import { selectCurrentUser } from 'with-react-redux-login'

import { selectCurrentRolesByTypes } from '../../../selectors'

function mapStateToProps(state) {
  return {
    currentRoles: selectCurrentRolesByTypes(state, ['admin', 'editor', 'reviewer']),
    currentUser: selectCurrentUser(state),
    isActive: state.navigation.isActive,
  }
}

export default mapStateToProps
