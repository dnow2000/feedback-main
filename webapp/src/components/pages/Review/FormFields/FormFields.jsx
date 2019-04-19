import PropTypes from 'prop-types'
import React from 'react'

import {
  CheckboxesField,
  HiddenField,
  RadiosField,
  TexteditorField
} from '../../../form/fields'
import {
  selectOptionsFromNameAndEntitiesAndPlaceholder,
} from '../../../form/utils'


const EVALUATIONS_NAME = 'evaluationId'
const EVALUATIONS_PLACEHOLDER = ''

const TAGS_NAME = 'tagIds'
const TAGS_PLACEHOLDER = ''

const FormFields = ({ evaluations, query, tags }) => {

  const evaluationOptions = selectOptionsFromNameAndEntitiesAndPlaceholder(
    EVALUATIONS_NAME,
    evaluations,
    EVALUATIONS_PLACEHOLDER,
    'label',
    'id',
    'info'
  )

  const tagOptions = selectOptionsFromNameAndEntitiesAndPlaceholder(
    TAGS_NAME,
    tags,
    TAGS_PLACEHOLDER,
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
          SCIENTIFIC CREDIBILITY RATING
        </h3>
        <RadiosField
          name={EVALUATIONS_NAME}
          options={evaluationOptions}
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
          name={TAGS_NAME}
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
