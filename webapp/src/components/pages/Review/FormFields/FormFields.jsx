import PropTypes from 'prop-types'
import React from 'react'

import CheckboxesField from 'components/layout/form/fields/CheckboxesField/CheckboxesField'
import HiddenField from 'components/layout/form/fields/HiddenField'
import RadiosField from 'components/layout/form/fields/RadiosField/RadiosField'
import TexteditorField from 'components/layout/form/fields/TexteditorField/TexteditorField'
import selectOptionsFromNameAndEntitiesAndPlaceholder from 'utils/form/selectOptionsFromNameAndEntitiesAndPlaceholder'


const EVALUATIONS_NAME = 'evaluationId'
const EVALUATIONS_PLACEHOLDER = ''

const TAGS_NAME = 'tagIds'
const TAGS_PLACEHOLDER = ''

const FormFields = ({ evaluations, form, tags }) => {

  const evaluationOptions = selectOptionsFromNameAndEntitiesAndPlaceholder(
    EVALUATIONS_NAME,
    evaluations,
    EVALUATIONS_PLACEHOLDER,
    'label',
    'id',
    'info',
    'value'
  )

  const tagOptions = selectOptionsFromNameAndEntitiesAndPlaceholder(
    TAGS_NAME,
    tags,
    TAGS_PLACEHOLDER,
    'text',
    'id',
    'info',
    'positivity'
  )
  const { readOnly } = form

  return (
    <div className="form-fields">
      <HiddenField
        name="articleId"
        type="hidden"
      />
      <TexteditorField
        label="Your review"
        name="comment"
        placeholder=""
        readOnly={readOnly}
        required
      />
      <div className="credibility-and-tags">
        <RadiosField
          label="Credibility score"
          name={EVALUATIONS_NAME}
          options={evaluationOptions}
          readOnly={readOnly}
          required
        />
        <CheckboxesField
          label="Tags"
          name={TAGS_NAME}
          options={tagOptions}
          readOnly={readOnly}
          required
        />
      </div>
    </div>
  )
}

FormFields.defaultProps = {
  evaluations: null,
  tags: null
}

FormFields.propTypes = {
  evaluations: PropTypes.array,
  form: PropTypes.shape({
    readOnly: PropTypes.bool.isRequired
  }).isRequired,
  tags: PropTypes.array,
}

export default FormFields
