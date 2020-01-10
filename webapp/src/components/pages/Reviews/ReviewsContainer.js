import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import withRequiredLogin from 'components/hocs/withRequiredLogin'
import withRoles from 'components/hocs/withRoles'

import Reviews from './Reviews'

export default compose(
  withRouter,
  withRequiredLogin,
  withRoles({ accessRoleTypes: ['editor'] }),
)(Reviews)
