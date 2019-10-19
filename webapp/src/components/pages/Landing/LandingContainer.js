import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import Landing from './Landing'
import { withRedirectWhenLoggedIn } from '../../hocs'

export default compose(
  withRouter,
  withRedirectWhenLoggedIn,
  connect()
)(Landing)
