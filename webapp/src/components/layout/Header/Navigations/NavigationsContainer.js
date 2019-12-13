import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { selectCurrentUser } from 'with-react-redux-login'

import Navigations from './Navigation'
import selectCurrentRolesByTypes from 'selectors/selectCurrentRolesByTypes'

const mapStateToProps = state =>  {
  return {
    currentRoles: selectCurrentRolesByTypes(state, ['admin', 'editor', 'reviewer']),
    currentUser: selectCurrentUser(state)
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(Navigations)
