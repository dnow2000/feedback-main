import React from 'react'

import TextField from 'components/layout/form/fields/TextField'


export default () => (
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
    <TextField
      id="publication-1"
      label="Publication 1"
      name="publication1"
      placeholder="Link to qualifying publications."
      required
    />
    <TextField
      id="publication-2"
      label="Publication 2"
      name="publication2"
      placeholder="Link to qualifying publications."
    />
    <TextField
      id="publication-3"
      label="Publication 3"
      name="publication3"
      placeholder="Link to qualifying publications."
    />
  </>
)
