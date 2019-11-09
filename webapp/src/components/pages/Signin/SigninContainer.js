import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import withRedirectWhenLoggedIn from '../../hocs/withRedirectWhenLoggedIn'
import Signin from './Signin'

export default compose(
  withRouter,
  withRedirectWhenLoggedIn,
  connect()
)(Signin)
