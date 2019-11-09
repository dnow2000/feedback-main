import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import Signup from './Signup'
import withRedirectWhenLoggedIn from '../../hocs/withRedirectWhenLoggedIn'

export default compose(
  withRouter,
  withRedirectWhenLoggedIn,
  connect()
)(Signup)
