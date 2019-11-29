import { combineReducers } from 'redux'
import { modals } from 'redux-react-modals'

import data from './data'
import menu from './menu'

const rootReducer = combineReducers({
  data,
  menu,
  modals
})

export default rootReducer
