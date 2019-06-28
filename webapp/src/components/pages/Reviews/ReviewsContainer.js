import { compose } from 'redux'

import Reviews from './Reviews'
import { withRequiredLogin, withRoles } from '../../hocs'

export default compose(
  withRequiredLogin,
  withRoles({ accessRoleTypes: ['editor'] }),
)(Reviews)
