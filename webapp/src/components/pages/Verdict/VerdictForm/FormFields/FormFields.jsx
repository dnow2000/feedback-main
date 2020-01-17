import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'

import ArticleItemContainer from 'components/layout/ArticleItem/ArticleItemContainer'
import CheckboxesField from 'components/layout/form/fields/CheckboxesField/CheckboxesField'
import HiddenField from 'components/layout/form/fields/HiddenField'
import SelectField from 'components/layout/form/fields/SelectField'
import TexteditorField from 'components/layout/form/fields/TexteditorField/TexteditorField'
import selectOptionsFromNameAndEntitiesAndPlaceholder from 'utils/form/selectOptionsFromNameAndEntitiesAndPlaceholder'
import ReviewersManagerContainer from '../../ReviewersManager/ReviewersManagerContainer'
import articleType from 'components/types/articleType'

import ArticleFields from './ArticleFields'


const SELECT_EVALUATIONS_NAME = 'evaluationId'
const SELECT_EVALUATIONS_PLACEHOLDER = 'Select an evaluation'

const CHECKBOXES_TAGS_NAME = 'tagIds'
const CHECKBOXES_TAGS_PLACEHOLDER = ''


const FormFields = ({ article, trending, evaluations, form, tags }) => {
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

  const { readOnly } = form
  const [readOnlyArticle, setReadOnlyArticle] = useState(true)
  const handleClickEdit = useCallback(() => {
    setReadOnlyArticle(!readOnlyArticle)
  }, [readOnlyArticle, setReadOnlyArticle])



  return (
    <div className="section">
      <HiddenField
        name="articleId"
        type="hidden"
      />
      <section className="article">
        {readOnlyArticle
          ? (
            <ArticleItemContainer
              article={article || trending}
              noControl
              onClickEdit={handleClickEdit}
            />
          )
          : <ArticleFields />
        }
      </section>
      <section>
        <ReviewersManagerContainer />
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

FormFields.defaultProps = {
  article: null,
  evaluations: null,
  tags: null
}

FormFields.propTypes = {
  article: PropTypes.shape(articleType),
  evaluations: PropTypes.array,
  query: PropTypes.object.isRequired,
  tags: PropTypes.array,
}

export default FormFields
