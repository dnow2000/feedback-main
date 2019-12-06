/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'
import { Link } from 'react-router-dom'

import EmailField from 'components/layout/form/fields/EmailField'
import PasswordField from 'components/layout/form/fields/PasswordField'

const FormFields = () => (
  <div>
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
    <Link className="is-white-text is-underline fs16" to="/mot-de-passe-perdu">
      <span>Mot de passe oublié&nbsp;?</span>
    </Link>
  </div>
)

export default FormFields
