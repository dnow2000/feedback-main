import { compose } from 'redux'

import Reviews from './Reviews'
import withRequiredLogin from '../../hocs/withRequiredLogin'
import withRoles from '../../hocs/withRoles'

export default compose(
  withRequiredLogin,
  withRoles({ accessRoleTypes: ['editor'] }),
)(Reviews)
