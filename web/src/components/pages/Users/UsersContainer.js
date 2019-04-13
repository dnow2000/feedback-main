import { compose } from 'redux'

import { withRedirectToSigninWhenNotAuthenticated, withRoles } from '../../hocs'

import Users from './Users'

export default compose(
  withRedirectToSigninWhenNotAuthenticated,
  withRoles({ creationRoleTypes: ['master'], modificationRoleTypes: ['master'] })
)(Users)
