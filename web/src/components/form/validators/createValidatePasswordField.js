import { isPassword } from '../strings'

export const createValidatePasswordField = error => value => {
  if (isPassword(value)) return undefined
  return error
}

export default createValidatePasswordField
