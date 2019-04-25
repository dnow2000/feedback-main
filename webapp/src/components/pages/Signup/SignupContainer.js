import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import Signup from './Signup'
import { withRedirectToArticlesWhenAlreadyAuthenticated } from '../../hocs'

export default compose(
  withRedirectToArticlesWhenAlreadyAuthenticated,
  withRouter,
  connect()
)(Signup)
