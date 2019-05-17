import withLogin from 'with-react-redux-login'

import { userNormalizer } from '../../../utils/normalizers'

export const withRedirectToSigninWhenNotAuthenticated =
  withLogin({
    failRedirect: ({ location }) => {
      const { pathname, search } = location
      const fromUrl = encodeURIComponent(`${pathname}${search}`)
      return `/signin?from=${fromUrl}`
    },
    isRequired: true,
    normalizer: userNormalizer 
  })

export default withRedirectToSigninWhenNotAuthenticated
