import moment from 'moment'
import 'moment/locale/fr'
import 'moment-timezone'

import { getMobileOperatingSystem } from './getMobileOperatingSystem'

moment.locale('fr-fr')

const { NODE_ENV } = process.env
export const IS_DEBUG = true
export const IS_DEVELOPMENT = NODE_ENV === 'development'
export const IS_PROD = !IS_DEVELOPMENT
export const MOBILE_OS = getMobileOperatingSystem()

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost'
export const THUMBS_URL =
  process.env.REACT_APP_THUMBS_URL || 'http://localhost/storage/thumbs'

let calculatedLocalhost
if (typeof window !== 'undefined') {
  calculatedLocalhost =
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
}

export const IS_LOCALHOST = Boolean(calculatedLocalhost)

function keyboardWillShow() {
  console.log('Keyboard show')
  document.body.className += ' softkeyboard'
}

function keyboardWillHide() {
  console.log('Keyboard Hide')
  document.body.className = document.body.className
    .split(' ')
    .filter(c => c !== 'softkeyboard')
    .join(' ')
}

let CALC_ROOT_PATH = ''
if (typeof window !== 'undefined' && window.cordova) {
  document.body.className += ' cordova'
  if (MOBILE_OS === 'android') {
    CALC_ROOT_PATH = 'file:///android_asset/www'
    document.body.className += ' cordova-android'
    // document.body.className += ' android-with-statusbar'
  } else if (MOBILE_OS === 'ios') {
    // TODO
    document.body.className += ' cordova-ios'
    CALC_ROOT_PATH = window.location.href.match(/file:\/\/(.*)\/www/)[0]
  }
  window.addEventListener('keyboardWillShow', keyboardWillShow)
  window.addEventListener('keyboardWillHide', keyboardWillHide)
} else if (typeof window !== 'undefined') {
  document.body.className += ' web'
  CALC_ROOT_PATH = `${window.location.protocol}//${document.location.host}`
}

export const ROOT_PATH = CALC_ROOT_PATH || 'http://localhost:3000/'

export const DEFAULT_TO = '/accueil'
