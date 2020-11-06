import { requestData } from 'redux-thunk-data'
import withLogin from 'with-react-redux-login'

import { userNormalizer } from 'utils/normalizers'


export default withLogin({
  isRequired: false,
  normalizer: userNormalizer,
  requestData
})
