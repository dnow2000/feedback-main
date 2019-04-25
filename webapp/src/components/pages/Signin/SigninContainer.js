import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import { withRedirectToArticlesWhenAlreadyAuthenticated } from '../../hocs'
import Signin from './Signin'

export default compose(
  withRedirectToArticlesWhenAlreadyAuthenticated,
  withQueryRouter(),
  connect()
)(Signin)
