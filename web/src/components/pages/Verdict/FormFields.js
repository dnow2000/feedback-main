import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import {
  HiddenField,
  CheckboxesField,
  SelectField,
  TexteditorField
} from '../../form/fields'
import {
  selectEvaluationsByType,
  selectTagsByScopes
} from '../../../selectors'
import {
  selectNewOrEditEntityContextFromLocation,
  selectOptionsFromNameAndEntitiesAndPlaceholder,
} from '../../form/utils'

const SELECT_EVALUATIONS_NAME = 'evaluationId'
const SELECT_EVALUATIONS_PLACEHOLDER = 'Select an evaluation'

const CHECKBOXES_TAGS_NAME = 'tagIds'
const CHECKBOXES_TAGS_PLACEHOLDER = ''

const FormFields = ({ evaluations, location, tags }) => {
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

  const newOrEditEntityContext = selectNewOrEditEntityContextFromLocation(
    location
  )
  const { readOnly } = newOrEditEntityContext || {}

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
  location: PropTypes.object.isRequired,
  tags: PropTypes.array
}

function mapStateToProps(state) {
  return {
    evaluations: selectEvaluationsByType(state, 'article'),
    tags: selectTagsByScopes(state, ['verdict'])
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(FormFields)
