import {
  errors,
  form,
  loading,
  modal,
  notification,
  tracker,
  user,
} from 'pass-culture-shared'
import { combineReducers } from 'redux'

import data from './data'
import navigation from './navigation'

const rootReducer = combineReducers({
  data,
  errors,
  form,
  loading,
  modal,
  navigation,
  notification,
  tracker,
  user,
})

export default rootReducer
