/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import { EmailField, PasswordField } from '../../layout/form/fields'

const FormFields = () => (
  <div className="field-group">
    <input type="hidden" name="name" value="user" />
    <EmailField
      id="identifier"
      required
      name="identifier"
      label="login"
      placeholder="Your login email"
    />
    <PasswordField
      id="password"
      required
      name="password"
      label="password"
      placeholder="Your login password"
    />
  </div>
)

export default FormFields
