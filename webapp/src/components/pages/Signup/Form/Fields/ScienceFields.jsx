import React from 'react'

import TextField from 'components/layout/form/fields/TextField'


export default () => (
  <>
    <TextField
      id="website"
      label="Academic Website"
      name="academicWebsite"
      placeholder="https://scholar.google.com/johndoe"
      required
      sublabel="Link to a webpage listing your publications."
    />
    <div className="title-and-affiliation">
      <TextField
        id="title"
        label="Title"
        name="title"
        placeholder="Associate Professor"
        required
      />
      <TextField
        id="affiliation"
        label="Affiliation"
        name="affiliation"
        placeholder="University of California"
        required
      />
    </div>
    <TextField
      id="expertise"
      label="Areas of expertise"
      name="expertiseAreas"
      placeholder="Cardiovascular health, Infectious diseases, Multiple sclerosis"
      required
      sublabel="Please separate fields by a comma"
    />
  </>
)
