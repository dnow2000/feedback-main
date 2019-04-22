import withLogin from 'with-react-redux-login'

export const withRedirectToArticlesWhenAlreadyAuthenticated = withLogin({
  isRequired: false,
  successRedirect: () => '/articles'
})

export default withRedirectToArticlesWhenAlreadyAuthenticated
