import React, { useCallback } from 'react'
import { useForm } from 'react-final-form'

import PictureField from 'components/layout/form/fields/PictureField'
import TextField from 'components/layout/form/fields/TextField'


export default ({ form }) => {
  const { batch, change } = form

  const handleImageChange = useCallback((thumb, croppingRect) => {
    batch(() => {
      change('thumb', thumb)
      change('croppingRect', croppingRect)
    })
  }, [batch, change])

  return (
    <div>
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
        readOnly
        required
        type="email"
      />
    </div>
  )
}
