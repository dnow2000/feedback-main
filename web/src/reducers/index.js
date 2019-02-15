import { combineReducers } from 'redux'
import { modals } from 'redux-react-modals'

import data from './data'
import navigation from './navigation'

const rootReducer = combineReducers({
  data,
  modals,
  navigation,
})

export default rootReducer
