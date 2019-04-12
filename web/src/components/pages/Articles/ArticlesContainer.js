import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import Articles from './Articles'
import mapStateToProps from './mapStateToProps'
import { withRedirectToSigninWhenNotAuthenticated } from '../../hocs'

export default compose(
  withRedirectToSigninWhenNotAuthenticated,
  withQueryRouter(),
  connect(mapStateToProps)
)(Articles)
