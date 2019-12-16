import { combineReducers } from 'redux'
import { modals } from 'redux-react-modals'

import data from './data'
import errors from './errors'
import menu from './menu'
import requests from './requests'

const rootReducer = combineReducers({
  data,
  errors,
  menu,
  modals,
  requests
})

export default rootReducer
