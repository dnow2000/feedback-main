import isString from './isString'

export default value => {
  if (!isString(value) || !value.trim().length) return false
  return /[0-9]/.test(value)
}
