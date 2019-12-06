import PropTypes from 'prop-types'
import React from 'react'

import CheckboxesField from 'components/layout/form/fields/CheckboxesField/CheckboxesField'
import HiddenField from 'components/layout/form/fields/HiddenField'
import RadiosField from 'components/layout/form/fields/RadiosField/RadiosField'
import TexteditorField from 'components/layout/form/fields/TexteditorField/TexteditorField'
import selectOptionsFromNameAndEntitiesAndPlaceholder from 'components/layout/form/utils/selectOptionsFromNameAndEntitiesAndPlaceholder'


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
    'text',
    'id',
    'info'
  )
  const { readOnly } = query.context()

  return (
    <div className="section">

      <HiddenField name="articleId" type="hidden" />

      <div className="field-group">
        <h3 className="field-group-title">
          COMMENT <span className="field-asterisk">*</span>
        </h3>
        <h4 className="field-group-sub-title">
          Your overall assessment of the article in a few sentences.
          Explain why the article is of low/high credibility,
          what is incorrect, missing, misleading, inaccurate,
          or flawed in the article (if anything) and what is actually correct
          (please support your claims with appropriate references,
            adding a figure if appropriate).
        </h4>
        <TexteditorField
          name="comment"
          placeholder=""
          readOnly={readOnly}
          required
        />
        <div className='field-sep' />
      </div>

      <div className="field-group">
        <h3 className="field-group-title">
          CREDIBILITY CRITERIA
        </h3>
        <h4 className="field-group-sub-title">
          Pick all the keywords that apply :
        </h4>
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
