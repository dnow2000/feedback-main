import isString from './isString'


export default value => {
  if (!isString(value) || !value.trim().length) return false
  return /[a-z]/.test(value)
}
