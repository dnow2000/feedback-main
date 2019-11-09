import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import Reviews from './Reviews'
import withRequiredLogin from '../../hocs/withRequiredLogin'
import withRoles from '../../hocs/withRoles'

export default compose(
  withQueryRouter,
  withRequiredLogin,
  withRoles({ accessRoleTypes: ['editor'] }),
)(Reviews)
