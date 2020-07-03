import React from 'react'
import { Field, useForm } from 'react-final-form'
import { FieldArray } from 'react-final-form-arrays'

import TextField from 'components/layout/form/fields/TextField'
import PublicationItem from 'components/layout/PublicationItem'


export default () => {
  const { getState } = useForm()
  const { values: { publications } } = getState()


  return (
    <>
      <div className="field-separator">
        <h2 className="field-separator-title">Publications</h2>
      </div>
      <TextField
        id="orcid-id"
        label="ORCID id"
        name="orcidId"
        sublabel="You can create one here: https://orcid.org"
      />
      <FieldArray name="publications">
        {({ fields }) =>
          fields.map((name, index) => (
            <div key={index}>
              <Field
                component="input"
                name={`${name}.title`}
              />
              <PublicationItem
                publication={(publications || [])[index]}
              />
            </div>
          ))}
      </FieldArray>
    </>
  )
}
