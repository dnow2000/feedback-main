import { compose } from 'redux'
import withQueryRouter from 'with-query-router'
import withLogin from 'with-react-redux-login'

import { getRedirectToSignin } from './helpers'
import { userNormalizer } from '../../../utils/normalizers'

export const withRequiredLogin = compose(
  withQueryRouter(),
  withLogin({
    handleFail: (state, action, ownProps) => {
      const { history, location } = ownProps
      history.push(getRedirectToSignin(location))
    },
    isRequired: true,
    normalizer: userNormalizer
  })
)

export default withRequiredLogin
