import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import withQuery from 'with-react-query'

import withRedirectWhenLoggedIn from 'components/hocs/withRedirectWhenLoggedIn'

import Signin from './Signin'

export default compose(
  withRouter,
  withRedirectWhenLoggedIn,
  withQuery(),
  connect()
)(Signin)
