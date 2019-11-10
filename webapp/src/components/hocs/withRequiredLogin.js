import { requestData } from 'redux-thunk-data'
import withLogin from 'with-react-redux-login'

import { userNormalizer } from 'utils/normalizers'

export const withRequiredLogin = withLogin({
  handleFail: (state, action, ownProps) => {
    const { history, location: { pathname, search} } = ownProps
    const from = encodeURIComponent(`${pathname}${search}`)
    history.push(`/signin?from=${from}`)
  },
  handleSuccess: (state, action, ownProps) => {
    const { payload: { datum: { validationToken } } } = action
    const { history } = ownProps
    const validated = validationToken === null
    if (!validated) {
      history.push('/home')
    }
  },
  isRequired: true,
  normalizer: userNormalizer,
  requestData
})

export default withRequiredLogin
