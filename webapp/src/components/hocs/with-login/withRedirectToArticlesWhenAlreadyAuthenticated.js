import withLogin from 'with-react-redux-login'

import { userNormalizer } from '../../../utils/normalizers'

export const withRedirectToArticlesWhenAlreadyAuthenticated = withLogin({
  isRequired: false,
  normalizer: userNormalizer,
  successRedirect: () => '/articles',
})

export default withRedirectToArticlesWhenAlreadyAuthenticated
