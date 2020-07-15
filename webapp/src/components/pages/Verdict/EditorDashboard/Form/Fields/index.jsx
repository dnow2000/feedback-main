import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { selectEntitiesByKeyAndJoin, selectEntityByKeyAndId } from 'redux-thunk-data'
import { useFormidable } from 'with-react-formidable'

import CheckboxesField from 'components/layout/form/fields/CheckboxesField'
import ContentItem from 'components/layout/ContentItem'
import HiddenField from 'components/layout/form/fields/HiddenField'
import SelectField from 'components/layout/form/fields/SelectField'
import TexteditorField from 'components/layout/form/fields/TexteditorField'
import useLocationURL from 'components/uses/useLocationURL'
import { selectOptionsFromNameAndEntitiesAndPlaceholder } from 'utils/form'
import selectEvaluationsByType from 'selectors/selectEvaluationsByType'
import selectTagsByScopes from 'selectors/selectTagsByScopes'

import ContentFields from './ContentFields'
import ReviewersManager from './ReviewersManager'


const SELECT_EVALUATIONS_NAME = 'evaluationId'
const SELECT_EVALUATIONS_PLACEHOLDER = 'Select an evaluation'

const CHECKBOXES_TAGS_NAME = 'tagIds'
const CHECKBOXES_TAGS_PLACEHOLDER = ''


export default () => {
  const location = useLocation()
  const params = useParams()
  const { verdictId } = params
  const locationURL = useLocationURL()
  const sourceId = locationURL.searchParams.get('sourceId')
  const { readOnly } = useFormidable(location, params)


  const [readOnlyContent, setReadOnlyContent] = useState(true)

  const evaluations = useSelector(state =>
    selectEvaluationsByType(state, 'article'))
  const evaluationOptions = selectOptionsFromNameAndEntitiesAndPlaceholder(
    SELECT_EVALUATIONS_NAME,
    evaluations,
    SELECT_EVALUATIONS_PLACEHOLDER
  )

  const tags = useSelector(state => selectTagsByScopes(state, ['verdict']))
  const tagOptions = selectOptionsFromNameAndEntitiesAndPlaceholder(
    CHECKBOXES_TAGS_NAME,
    tags,
    CHECKBOXES_TAGS_PLACEHOLDER,
    'label'
  )


  const trending = useSelector(state =>
    selectEntitiesByKeyAndJoin(
      state,
      'trendings',
      { key: 'sourceId', value: sourceId }
  )[0])

  const verdict = useSelector(state =>
    selectEntityByKeyAndId(state, 'verdicts', verdictId))

  const { articleId } = verdict || {}
  const article = useSelector(state =>
    selectEntityByKeyAndId(state, 'articles', articleId))

  const reviews = useSelector(state =>
    selectEntitiesByKeyAndJoin(
      state,
      'reviews',
      { key: 'articleId', value: articleId }
    ))


  const handleClickEdit = useCallback(() => {
    setReadOnlyContent(!readOnlyContent)
  }, [readOnlyContent, setReadOnlyContent])


  return (
    <div className="section">
      <HiddenField
        name="articleId"
        type="hidden"
      />
      <section className="article">
        {readOnlyContent
          ? (
            <ContentItem
              article={article || trending}
              noControl
              onClickEdit={handleClickEdit}
            />
          )
          : <ContentFields />
        }
      </section>
      <section>
        <ReviewersManager />
      </section>
      {reviews.length > 0 &&
        (
          <>
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
          </>
      )
    }
    </div>
  )
}
