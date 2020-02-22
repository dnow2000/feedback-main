import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { useFormidable } from 'with-react-formidable'

import CheckboxesField from 'components/layout/form/fields/CheckboxesField/CheckboxesField'
import HiddenField from 'components/layout/form/fields/HiddenField'
import RadiosField from 'components/layout/form/fields/RadiosField/RadiosField'
import TexteditorField from 'components/layout/form/fields/TexteditorField/TexteditorField'
import selectEvaluationsByType from 'selectors/selectEvaluationsByType'
import selectTagsByScopes from 'selectors/selectTagsByScopes'
import selectOptionsFromNameAndEntitiesAndPlaceholder from 'utils/form/selectOptionsFromNameAndEntitiesAndPlaceholder'

const EVALUATIONS_NAME = 'evaluationId'
const EVALUATIONS_PLACEHOLDER = ''

const TAGS_NAME = 'tagIds'
const TAGS_PLACEHOLDER = ''


const FormFields = () => {
  const location = useLocation()
  const params = useParams()
  const { readOnly } = useFormidable(location, params)

  const evaluations = useSelector(state =>
    selectEvaluationsByType(state, 'article'))

  const tags = useSelector(state =>
    selectTagsByScopes(state, ['review']))

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


export default FormFields
