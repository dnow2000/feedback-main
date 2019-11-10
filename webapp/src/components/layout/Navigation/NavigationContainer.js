import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { selectCurrentUser } from 'with-react-redux-login'

import Navigation from './Navigation'
import selectCurrentRolesByTypes from 'selectors/selectCurrentRolesByTypes'

const mapStateToProps = state =>  {
  return {
    currentRoles: selectCurrentRolesByTypes(state, ['admin', 'editor', 'reviewer']),
    currentUser: selectCurrentUser(state),
    isActive: state.navigation.isActive,
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Navigation)
