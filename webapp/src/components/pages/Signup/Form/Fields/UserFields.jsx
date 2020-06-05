import React from 'react'
import { useParams } from 'react-router-dom'

import CheckboxField from 'components/layout/form/fields/CheckboxField'
import PasswordField from 'components/layout/form/fields/PasswordField'
import PictureField from 'components/layout/form/fields/PictureField'
import TextField from 'components/layout/form/fields/TextField'


export default ({ onImageChange }) => {
  const { roleType } = useParams()

  return (
    <>
      <div className="picture-and-names">
        <PictureField
          id="thumb"
          label="Photo"
          name="thumb"
          onImageChange={onImageChange}
          required
        />
        <div className="names">
          <TextField
            id="first-name"
            label="First name"
            name="firstName"
            placeholder="John"
            required
          />
          <TextField
            id="last-name"
            label="Last name"
            name="lastName"
            placeholder="Doe"
            required
          />
        </div>
      </div>
      <TextField
        id="email"
        label="Email"
        name="email"
        placeholder="john.doe@gmail.com"
        required
        sublabel={(roleType === 'reviewer' ? 'Official email from your research institution, ' : '') + 'it will not be displayed publicly.'}
        type="email"
      />
      <PasswordField
        id="password"
        label="Password"
        name="password"
        placeholder="MySaf3Pa55word!"
        required
      />
    </>
  )
}
