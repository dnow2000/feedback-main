import { selectCurrentUser } from 'with-react-redux-login'

import { selectCurrentRolesByTypes } from '../../../selectors'

const mapStateToProps = state =>  {
  return {
    currentRoles: selectCurrentRolesByTypes(state, ['admin', 'editor', 'reviewer']),
    currentUser: selectCurrentUser(state),
    isActive: state.navigation.isActive,
  }
}

export default mapStateToProps
