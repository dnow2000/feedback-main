import { compose } from 'redux'
import { requestData } from 'redux-thunk-data'
import withQueryRouter from 'with-query-router'
import withLogin from 'with-react-redux-login'

import { userNormalizer } from '../../utils/normalizers'


const withRedirectWhenLoggedIn = compose(
  withQueryRouter(),
  withLogin({
    handleSuccess: (state, action, ownProps) => {
      const { payload: { datum: { validationToken } } } = action
      const { history, location: { pathname } } = ownProps
      const validated = validationToken === null
      if (!validated) {
        history.push('/home')
        return
      }
      if (
        pathname === '/signin'||
        pathname === '/signup'||
        pathname === '/'||
        pathname === '/home'
      ) {
        history.push('/articles')
      }
    },
    isRequired: false,
    normalizer: userNormalizer,
    requestData,
  })
)

export default withRedirectWhenLoggedIn
