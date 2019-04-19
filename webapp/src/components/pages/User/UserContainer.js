import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import { withRedirectToSigninWhenNotAuthenticated, withRoles } from '../../hocs'

import User from './User'
import mapStateToProps from './mapStateToProps'

export default compose(
  withRedirectToSigninWhenNotAuthenticated,
  withRoles({ creationRoleTypes: ['master'], modificationRoleTypes: ['master'] }),
  withRouter,
  connect(mapStateToProps)
)(User)
