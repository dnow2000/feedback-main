import withLogin from 'with-react-redux-login'

export const withRedirectToSigninWhenNotAuthenticated =
  withLogin({
    failRedirect: ({ location }) => {
      const { pathname, search } = location
      const fromUrl = encodeURIComponent(`${pathname}${search}`)
      return `/signin?from=${fromUrl}`
    },
    isRequired: true
  })

export default withRedirectToSigninWhenNotAuthenticated
