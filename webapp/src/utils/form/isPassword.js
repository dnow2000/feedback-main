import isString from './isString'
import hasNumber from './hasNumber'
import hasMinLength from './hasMinLength'
import hasUppercase from './hasUppercase'
import hasLowercase from './hasLowercase'

export default (value, count = 12) =>
  value &&
  isString(value) &&
  hasMinLength(value, count) &&
  hasUppercase(value) &&
  hasLowercase(value) &&
  hasNumber(value)
