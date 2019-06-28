import { compose } from 'redux'

import { withRequiredLogin, withRoles } from '../../hocs'

import Users from './Users'

export default compose(
  withRequiredLogin,
  withRoles({ creationRoleTypes: ['master'], modificationRoleTypes: ['master'] })
)(Users)
