import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import Trendings from './Trendings'
import mapStateToProps from './mapStateToProps'
import { withRedirectToSigninWhenNotAuthenticated, withRoles } from '../../hocs'

export default compose(
  withRedirectToSigninWhenNotAuthenticated,
  withRoles({ accessRoleTypes: ['editor'] }),
  withQueryRouter(),
  connect(mapStateToProps)
)(Trendings)
