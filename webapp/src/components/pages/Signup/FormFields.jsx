import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import {
  EmailField,
  PasswordField,
  TextField,
  PictureField,
 } from '../../layout/form/fields'

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

  render() {
    const { onImageChange } = this.props
    const { role } = this.state
    return (
      <Fragment>
        <div className="field-group">
          <h3 className="field-group-title">
            Personal details:
          </h3>
          <TextField
            id="first-name"
            name="firstName"
            label="First Name"
            required
          />
          <TextField
            id="last-name"
            name="lastName"
            label="Last Name"
            required
          />
          <EmailField
            id="email"
            name="email"
            label="Email"
            sublabel="Official email from your research institution"
            required
          />
          <PasswordField
            id="password"
            name="password"
            label="Password"
            placeholder="Your login password"
            required
          />
          <TextField
            id="title"
            name="title"
            label="Title"
            sublabel="(eg: Postdoctoral research fellow, Associate Professor)"
            required
          />
          <TextField
            id="website"
            name="academicWebsite"
            label="Academic Website"
            required
          />
          <PictureField
            id="picture"
            name="picture"
            label="Picture"
            sublabel="Professional picture, square headshot"
            required
            onImageChange={onImageChange}
          />
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
}

FormFields.propTypes = {
  onImageChange: PropTypes.func.isRequired
}

export default FormFields
