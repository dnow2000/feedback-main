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
  const { readOnly } = query.context()
  console.log('TAG OPTIONS', tags, tagOptions)

  return (
    <div className="fields-container">
      <div className="fields-table">
        <div className="col-tablet-33">
          <RadiosField
            label="Credibility score"
            name={EVALUATIONS_NAME}
            options={evaluationOptions}
            readOnly={readOnly}
            required
          />
        </div>
        <div className="col-tablet-66">
          <CheckboxesField
            label="Tags"
            name={TAGS_NAME}
            options={tagOptions}
            readOnly={readOnly}
            required
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className="section">

      {/* <HiddenField name="articleId" type="hidden" />
      <div className="field-group">
        <TexteditorField
          name="comment"
          placeholder=""
          readOnly={readOnly}
          required
        />
        <div className='field-sep' />
      </div> */}

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
