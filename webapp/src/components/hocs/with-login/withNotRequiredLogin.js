import { compose } from 'redux'
import withQueryRouter from 'with-query-router'
import withLogin from 'with-react-redux-login'

import { getRedirectToCurrentLocationOrArticles } from './helpers'
import { userNormalizer } from '../../../utils/normalizers'

export const withNotRequiredLogin = compose(
  withQueryRouter(),
  withLogin({
    handleSuccess: (state, action, ownProps) => {
      const {
        payload: { datum },
      } = action
      const { history, location } = ownProps
      history.push(
        getRedirectToCurrentLocationOrArticles({
          currentUser: datum,
          ...location,
        })
      )
    },
    isRequired: false,
    normalizer: userNormalizer,
  })
)

export default withNotRequiredLogin
