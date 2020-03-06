import { requestData } from 'redux-thunk-data'
import withLogin from 'with-react-redux-login'

import { userNormalizer } from 'utils/normalizers'


export default withLogin({
  handleSuccess: (state, action, ownProps) => {
    const { payload: { datum: { validationToken } } } = action
    const { history, location: { pathname } } = ownProps
    const validated = validationToken === null
    if (!validated) {
      history.push('/landing')
      return
    }
    if (
      pathname === '/signin'||
      pathname === '/signup'||
      pathname === '/landing'||
      pathname === '/'
    ) {
      history.push('/articles')
    }
  },
  isRequired: false,
  normalizer: userNormalizer,
  requestData,
})
