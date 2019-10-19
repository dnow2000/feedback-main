import { compose } from 'redux'

import Users from './Users'
import { withRequiredLogin, withRoles } from '../../hocs'

export default compose(
  withRequiredLogin,
  withRoles({ creationRoleTypes: ['editor'], modificationRoleTypes: ['editor'] })
)(Users)
