import { getMobileRootPath } from 'utils/mobile'

const {
  NODE_ENV,
  REACT_APP_NAME,
  REACT_APP_API_URL,
  REACT_APP_LOGO_ICONS_PATH,
  REACT_APP_ROOT_ASSETS_PATH,
  REACT_APP_VERSION
} = process.env

export const APP_NAME = REACT_APP_NAME || 'unnamed'
export const VERSION = REACT_APP_VERSION || ''

export const IS_DEBUG = true
export const IS_DEVELOPMENT = NODE_ENV === 'development'
export const IS_PRODUCTION = !IS_DEVELOPMENT

const LOCALHOST_API_URL = 'http://localhost'
export const API_URL = REACT_APP_API_URL || LOCALHOST_API_URL
export const API_THUMBS_URL = `${API_URL}/storage/thumbs`

export const LOCALHOST_ROOT_PATH = "http://localhost:3000/"
export const ROOT_PATH = getMobileRootPath() || LOCALHOST_ROOT_PATH
export const ROOT_ASSETS_PATH = `${ROOT_PATH}/static/assets`
export const ROOT_LOGO_ICONS_PATH = `${ROOT_PATH}/static/icons`
