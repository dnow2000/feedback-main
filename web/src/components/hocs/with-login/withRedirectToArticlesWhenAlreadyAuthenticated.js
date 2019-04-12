import { connect } from 'react-redux'
import { compose } from 'redux'
import withLogin from 'with-react-login'

export const withRedirectToArticlesWhenAlreadyAuthenticated = compose(
  connect(),
  withLogin({
    isRequired: false,
    successRedirect: () => '/articles',
  })
)

export default withRedirectToArticlesWhenAlreadyAuthenticated
