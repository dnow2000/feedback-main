import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import withRedirectWhenLoggedIn from 'components/hocs/withRedirectWhenLoggedIn'

import Signup from './Signup'

export default compose(
  withRouter,
  withRedirectWhenLoggedIn,
  connect()
)(Signup)
