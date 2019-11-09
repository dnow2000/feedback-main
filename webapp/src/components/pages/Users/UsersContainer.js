import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import Users from './Users'
import withRequiredLogin from '../../hocs/withRequiredLogin'
import withRoles from '../../hocs/withRoles'

export default compose(
  withQueryRouter(),
  withRequiredLogin,
  withRoles({ creationRoleTypes: ['editor'], modificationRoleTypes: ['editor'] })
)(Users)
