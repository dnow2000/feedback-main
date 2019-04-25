import { compose } from 'redux'

import Reviews from './Reviews'
import { withRedirectToSigninWhenNotAuthenticated, withRoles } from '../../hocs'

export default compose(
  withRedirectToSigninWhenNotAuthenticated,
  withRoles({ accessRoleTypes: ['editor'] }),
)(Reviews)
