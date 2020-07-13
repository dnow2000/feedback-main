import React from 'react'

import TextareaField from 'components/layout/form/fields/TextareaField'
import TextField from 'components/layout/form/fields/TextField'


export default () => (
  <>
    <TextField
      label="url"
      name="articleUrl"
      required
    />
    <TextField
      label="title"
      name="articleTitle"
      required
    />
    <TextareaField
      label="summary"
      name="articleSummary"
      required
      rows={5}
    />
  </>
)
