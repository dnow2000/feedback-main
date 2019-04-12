import { connect } from 'react-redux'
import { compose } from 'redux'
import withLogin from 'with-react-login'

export const withRedirectToSigninWhenNotAuthenticated = compose(
  connect(),
  withLogin({
    failRedirect: ({ location }) => {
      const { pathname, search } = location
      const fromUrl = encodeURIComponent(`${pathname}${search}`)
      return `/signin?from=${fromUrl}`
    },
    isRequired: true,
  })
)

export default withRedirectToSigninWhenNotAuthenticated
