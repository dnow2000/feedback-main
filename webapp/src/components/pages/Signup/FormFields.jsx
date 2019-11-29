import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import {
  EmailField,
  PasswordField,
  TextField,
  PictureField,
  CheckboxField
} from 'components/layout/form/fields'

const ROLES = {
  editor: 'editor',
  reviewer: 'reviewer'
}

class FormFields extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      role: ROLES.reviewer
    }
  }

  onSelectRole = role => {
    this.setState({role})
  }

  renderForEditor() {
    return null
  }

  renderForReviewer() {
    const { onImageChange } = this.props
    const { role } = this.state
    return (
      <Fragment>
        <div className="fields-container">
          <div className="fields-table">
            <PictureField
              className="col-tablet-33"
              id="picture"
              label="Photo"
              name="picture"
              onImageChange={onImageChange}
              required
            />
            <div className="col-tablet-66">
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
          />
          <TextField
            id="website"
            label="Academic Website"
            name="academicWebsite"
            placeholder="https://scholar.google.com/johndoe"
            required
            sublabel="Link to a webpage listing your publications."
          />
          <div className="fields-table">
            <TextField
              className="col-tablet-50"
              id="title"
              label="Title"
              name="title"
              placeholder="Associate Professor"
              required
            />
            <TextField
              className="col-tablet-50"
              id="affiliation"
              label="Affiliation"
              name="affiliation"
              placeholder="University of California"
              required
            />
          </div>
          <TextField
            id="expertise"
            name="expertiseAreas"
            label="Areas of expertise"
            placeholder="Cardiovascular health, Infectious diseases, Multiple sclerosis"
            sublabel="Please separate fields by a comma"
            required
          />
          {role === 'reviewer' && (
            <>
              <div className="field-separator">
                <h2 className="field-separator-title">Publications</h2>
              </div>
              <TextField
                id="publication-1"
                name="publication-1"
                label="Publication 1"
                placeholder="Link to qualifying publications."
                required
              />
              <TextField
                id="publication-2"
                name="publication-2"
                label="Publication 2"
                placeholder="Link to qualifying publications."
              />
              <TextField
                id="publication-3"
                name="publication-3"
                label="Publication 3"
                placeholder="Link to qualifying publications."
              />
              <TextField
                id="orcid-id"
                name="orcidId"
                label="ORCID id"
                sublabel="You can create one here: https://orcid.org"
              />
            </>
          )}
        <div className="pt20"></div>
        <CheckboxField
            id="community-rules"
            name="community-rules"
            text="I agree to comply to community rules."
        />
        <CheckboxField
            id="terms-and-conditions"
            name="terms-and-conditions"
            text="I hereby accept Terms and Conditions relatives to science-feedback.co."
        />
        </div>
      </Fragment>
    )
  }

  render() {
    return this.renderForReviewer()
  }
}

FormFields.propTypes = {
  onImageChange: PropTypes.func.isRequired
}

export default FormFields
