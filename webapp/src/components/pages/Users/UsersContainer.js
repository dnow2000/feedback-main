import { compose } from 'redux'

import Users from './Users'
import withRequiredLogin from '../../hocs/withRequiredLogin'
import withRoles from '../../hocs/withRoles'

export default compose(
  withRequiredLogin,
  withRoles({ creationRoleTypes: ['editor'], modificationRoleTypes: ['editor'] })
)(Users)
