import PropTypes from 'prop-types'
import React from 'react'

import CheckboxesField from 'components/layout/form/fields/CheckboxesField/CheckboxesField'
import HiddenField from 'components/layout/form/fields/HiddenField'
import SelectField from 'components/layout/form/fields/SelectField'
import TexteditorField from 'components/layout/form/fields/TexteditorField/TexteditorField'
import selectOptionsFromNameAndEntitiesAndPlaceholder from 'utils/form/selectOptionsFromNameAndEntitiesAndPlaceholder'

const SELECT_EVALUATIONS_NAME = 'evaluationId'
const SELECT_EVALUATIONS_PLACEHOLDER = 'Select an evaluation'

const CHECKBOXES_TAGS_NAME = 'tagIds'
const CHECKBOXES_TAGS_PLACEHOLDER = ''

const FormFields = ({ evaluations, query, tags }) => {
  const evaluationOptions = selectOptionsFromNameAndEntitiesAndPlaceholder(
    SELECT_EVALUATIONS_NAME,
    evaluations,
    SELECT_EVALUATIONS_PLACEHOLDER
  )

  const tagOptions = selectOptionsFromNameAndEntitiesAndPlaceholder(
    CHECKBOXES_TAGS_NAME,
    tags,
    CHECKBOXES_TAGS_PLACEHOLDER,
    'text'
  )

  const { readOnly } = query.context()

  return (
    <div className="section">

      <HiddenField name="articleId" type="hidden" />

      <div className="field-group">
        <h3 className="field-group-title">
          OVERALL ASSESSMENT OF THE ARTICLE CREDIBILITY <span className="field-asterisk">*</span>
        </h3>
        <TexteditorField
          name="comment"
          readOnly={readOnly}
          required
        />
        <div className='field-sep' />
      </div>

      <div className="field-group">
        <h3 className="field-group-title">
          RATE THE SCIENTIFIC CREDIBILITY
        </h3>
        <SelectField
          name={SELECT_EVALUATIONS_NAME}
          options={evaluationOptions}
          placeholder={SELECT_EVALUATIONS_PLACEHOLDER}
          readOnly={readOnly}
          required
        />
        <div className='field-sep' />
      </div>

      <div className="field-group">
        <h3 className="field-group-title">
          HOW WOULD QUALIFY THIS ARTICLE
        </h3>
        <CheckboxesField
          name={CHECKBOXES_TAGS_NAME}
          options={tagOptions}
          readOnly={readOnly}
        />
        <div className='field-sep' />
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
  query: PropTypes.object.isRequired,
  tags: PropTypes.array,
}

export default FormFields
