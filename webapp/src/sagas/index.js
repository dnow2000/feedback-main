import { all } from 'redux-saga/effects'
import { watchDataActions } from 'redux-saga-data'
import { watchModalActions } from 'redux-react-modals'

import { API_URL } from '../utils/config'

function* rootSaga() {
  yield all([
    watchDataActions({ rootUrl: API_URL }),
    watchModalActions()
  ])
}

export default rootSaga
