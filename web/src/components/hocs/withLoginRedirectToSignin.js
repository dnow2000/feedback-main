import withLogin from 'with-login'

export const withLoginRedirectToSignin = withLogin(
  {
    failRedirect: ({ location }) =>
      `/signin?from=${encodeURIComponent(`${location.pathname}${location.search}`)}`,
    isRequired: true
  }
)

export default withLoginRedirectToSignin
