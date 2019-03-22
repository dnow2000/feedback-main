import withLogin from 'with-login'

export const withRedirectToArticlesWhenAlreadyAuthenticated = withLogin({
  isRequired: false,
  successRedirect: () => '/articles',
})

export default withRedirectToArticlesWhenAlreadyAuthenticated
