import React, { Fragment } from 'react'
import {
  EmailField,
  PasswordField,
  TextField
 } from '../../layout/form/fields'

const FormFields = () => (
  <Fragment>
    <div className="field-group">
      <h3 className="field-group-title">
        Personal details:
      </h3>
      <EmailField
        id="email"
        label="Login"
        name="email"
        placeholder="Your login email"
        required
      />
      <PasswordField
        id="password"
        label="Password"
        name="password"
        placeholder="Your login password"
        required
      />
      <TextField
        id="public-name"
        label="Public Name"
        name="publicName"
        placeholder="Your first and last name for exampe"
      />
    </div>

    <div className="field-group">
      <h3 className="field-group-title">
        More info if you pretend to be a reviewer:
      </h3>
      <TextField
        label="Url of one of your peer reviewed publication"
        name="url"
      />
    </div>
  </Fragment>
)

export default FormFields
