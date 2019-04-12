import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import Article from './Article'
import mapStateToProps from './mapStateToProps'
import { withRedirectToSigninWhenNotAuthenticated, withRoles } from '../../hocs'

export default compose(
  withRedirectToSigninWhenNotAuthenticated,
  withRoles({ creationUserRoleTypes: ['editor'], modificationRoleTypes: ['editor'] }),
  withQueryRouter(),
  connect(mapStateToProps)
)(Article)
