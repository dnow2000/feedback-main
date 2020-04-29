import PropTypes from 'prop-types'
import React from 'react'
import { Route } from 'react-router-dom'

import CheckboxField from 'components/layout/form/fields/CheckboxField'
import PasswordField from 'components/layout/form/fields/PasswordField'
import PictureField from 'components/layout/form/fields/PictureField'
import TextField from 'components/layout/form/fields/TextField'
import { APP_NAME } from 'utils/config'


const _ = ({ onImageChange }) => (
  <div className="form-fields">
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
      sublabel="Official email from your research institution, it will not be displayed publicly."
      type="email"
    />
    <PasswordField
      id="password"
      label="Password"
      name="password"
      placeholder="MySaf3Pa55word!"
      required
    />
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
    <Route
      exact
      path="/signup/reviewer"
      render={() => (
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
      )}
    />
    <div className="pt20" />
    <CheckboxField
      id="community-rules"
      name="communityRules"
      required
      text="I agree to comply to community rules."
    />
    <CheckboxField
      id="terms-and-conditions"
      name="termsAndConditions"
      required
      text={`I hereby accept Terms and Conditions relatives to ${APP_NAME}.`}
    />
  </div>
)

_.propTypes = {
  onImageChange: PropTypes.func.isRequired
}

export default _
