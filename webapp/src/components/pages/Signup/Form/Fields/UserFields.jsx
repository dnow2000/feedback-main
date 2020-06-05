import React, { useCallback } from 'react'
import { useForm } from 'react-final-form'
import { useParams } from 'react-router-dom'

import PasswordField from 'components/layout/form/fields/PasswordField'
import PictureField from 'components/layout/form/fields/PictureField'
import TextField from 'components/layout/form/fields/TextField'


export default () => {
  const { roleType } = useParams()
  const { batch, change } = useForm()

  const emailSublabel = roleType
    ? 'Official email from your research institution, it will not be displayed publicly.'
    : 'It will not be displayed publicly.'


  const handleImageChange = useCallback((thumb, croppingRect) => {
    batch(() => {
      change('thumb', thumb)
      change('croppingRect', croppingRect)
    })
  }, [batch, change])

  return (
    <>
      <div className="picture-and-names">
        <PictureField
          id="thumb"
          label="Photo"
          name="thumb"
          onImageChange={handleImageChange}
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
        sublabel={emailSublabel}
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
