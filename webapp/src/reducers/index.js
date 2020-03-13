import { combineReducers } from 'redux'
import { modals } from 'redux-react-modals'

import data from './data'
import menu from './menu'
import requests from './requests'
import scroll from './scroll'

const rootReducer = combineReducers({
  data,
  menu,
  modals,
  requests,
  scroll
})

export default rootReducer
