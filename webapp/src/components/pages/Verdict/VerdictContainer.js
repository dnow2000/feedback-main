import { connect } from 'react-redux'
import { compose } from 'redux'

import Verdict from './Verdict'
import mapStateToProps from './mapStateToProps'
import { withRedirectToSigninWhenNotAuthenticated, withRoles } from '../../hocs'

export default compose(
  withRedirectToSigninWhenNotAuthenticated,
  withRoles({ creationRoleTypes: ['editor'], modificationRoleTypes: ['editor'] }),
  connect(mapStateToProps)
)(Verdict)
