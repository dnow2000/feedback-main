import { combineReducers } from 'redux'
import { modals } from 'redux-react-modals'

import data from './data'
import menu from './menu'
import requests from './requests'
import scroll from './scroll'
import transition from './transition'


export default combineReducers({
  data,
  menu,
  modals,
  requests,
  scroll,
  transition
})
