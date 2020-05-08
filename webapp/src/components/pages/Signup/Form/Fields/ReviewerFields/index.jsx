import React from 'react'
import { useForm } from 'react-final-form'

import TextField from 'components/layout/form/fields/TextField'

import PublicationField from './PublicationField'


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
      {(publications || []).map(publication => (
        <PublicationField
          key={publication.title}
          publication={publication}
        />
      ))}
      {/*<PublicationField isNew />*/}
    </>
  )
}
