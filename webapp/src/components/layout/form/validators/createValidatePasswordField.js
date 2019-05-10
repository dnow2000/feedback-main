import { isPassword } from 'react-final-form-utils'

export const createValidatePasswordField = error => value => {
  if (isPassword(value)) return undefined
  return error
}

export default createValidatePasswordField
