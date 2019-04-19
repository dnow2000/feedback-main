import { connect } from 'react-redux'
import { compose } from 'redux'

import { withRedirectToSigninWhenNotAuthenticated, withRoles } from '../../hocs'

import Review from './Review'
import mapStateToProps from './mapStateToProps'

export default compose(
  withRedirectToSigninWhenNotAuthenticated,
  withRoles({ creationRoleTypes: ['reviewer'], modificationRoleTypes: ['reviewer'] }),
  connect(mapStateToProps)
)(Review)
