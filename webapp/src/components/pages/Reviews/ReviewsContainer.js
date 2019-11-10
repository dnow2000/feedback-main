import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import withRequiredLogin from 'components/hocs/withRequiredLogin'
import withRoles from 'components/hocs/withRoles'

import Reviews from './Reviews'

export default compose(
  withQueryRouter,
  withRequiredLogin,
  withRoles({ accessRoleTypes: ['editor'] }),
)(Reviews)
