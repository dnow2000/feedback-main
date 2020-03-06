import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { useFormidable } from 'with-react-formidable'

import CheckboxField from 'components/layout/form/fields/CheckboxField'
import TextareaField from 'components/layout/form/fields/TextareaField'
import TextField from 'components/layout/form/fields/TextField'

import createValidateScrapField from './validators/createValidateScrapField'


const validateScrapField = createValidateScrapField()

const FormFields = ({
  validating
}) => {
  const { isModifiedEntity, readOnly } = useFormidable()

  return (
    <div className="section">
      <div className="field-group">
        <TextField
          label="url"
          name="url"
          readOnly={readOnly || isModifiedEntity}
          renderValue={() => (
            <button
              className={classnames("button is-loading is-transparent", {
                "is-seethrough": !validating
              })}
              type="button"
            />
          )}
          required
          validate={validateScrapField}
        />
        <TextField
          label="title"
          name="title"
          readOnly={readOnly}
          required
        />
        <TextareaField
          label="summary"
          name="summary"
          readOnly={readOnly}
          required
          rows={readOnly ? 1 : 5}
        />

        <div className="optional-subtitle">
          Optional:
        </div>
        <CheckboxField
          label="Is this article reviewable ?"
          name="isReviewable"
          readOnly={readOnly}
        />
        <div className="flex-columns flex-wrap">
          <TextField
            className='pr12'
            label="Total shares"
            name="totalShares"
            readOnly={readOnly}
            type="number"
          />
          <TextField
            className='pr12'
            label="Facebook shares"
            name="fbShares"
            readOnly={readOnly}
            type="number"
          />
          <TextField
            label="Twitter shares"
            name="twitterShares"
            readOnly={readOnly}
            type="number"
          />
        </div>
      </div>
    </div>
  )
}

FormFields.defaultProps = {
  validating: false
}

FormFields.propTypes = {
  formidable: PropTypes.shape({
    isModifiedEntity: PropTypes.bool,
    readOnly: PropTypes.bool,
  }).isRequired,
  validating: PropTypes.bool
}

export default FormFields
