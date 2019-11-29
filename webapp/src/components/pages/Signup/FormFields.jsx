import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import {
  EmailField,
  PasswordField,
  TextField,
  PictureField,
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
        <div className="field-group">
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
            placeholder="https://scholar.googl.com/johndoe"
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
          {role === 'reviewer' && (
            <>
              <TextField
                id="bio"
                name="bio"
                label="Bio"
                required
              />
              <TextField
                id="affiliation"
                name="affiliation"
                label="Affiliation"
                sublabel="(eg: University of California)"
                required
              />
              <TextField
                id="expertise"
                name="expertiseAreas"
                label="Areas of expertise"
                sublabel="Comma separated, e.g. 'Cardiovascular health, Infectious diseases, Multiple sclerosis'"
                required
              />
              <TextField
                id="orcid-id"
                name="orcidId"
                label="ORCID id"
                sublabel="(You can create one here: https://orcid.org/)"
              />
              <TextField
                id="publication-1"
                name="publication-1"
                label="Publication 1"
                sublabel="Link to qualifying publication(s). You should be the first author[1] of an article published in a referred health science journal within the last 4 years."
                required
              />
              <TextField
                id="publication-2"
                name="publication-2"
                label="Publication 2"
              />
              <TextField
                id="publication-3"
                name="publication-3"
                label="Publication 3"
              />
            </>
          )}
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
