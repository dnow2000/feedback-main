import { connect } from 'react-redux'
import { compose } from 'redux'
import withLogin from 'with-login'

export const withRedirectToArticlesWhenAlreadyAuthenticated = compose(
  connect(),
  withLogin({
    isRequired: false,
    successRedirect: () => '/articles',
  })
)

export default withRedirectToArticlesWhenAlreadyAuthenticated
