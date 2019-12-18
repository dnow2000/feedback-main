import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { Form } from 'react-final-form'
import { NavLink } from 'react-router-dom'

import ArticleItemContainer from 'components/layout/ArticleItem/ArticleItemContainer'
import HeaderContainer from 'components/layout/Header/HeaderContainer'
import MainContainer from 'components/layout/Main/MainContainer'
import articleType from 'components/types/articleType'
import getCanSubmit from 'utils/form/getCanSubmit'

import FormFooterContainer from './FormFooter/FormFooterContainer'
import FormFieldsContainer from './FormFields/FormFieldsContainer'

const Review = ({
  article,
  form: { isCreatedEntity },
  formInitialValues,
  history,
  isPending,
  query,
  requestGetData,
  requestSubmitReview
}) => {
  const { id: modifiedReviewId } = formInitialValues
  const { articleId } = query.getParams()

  const handleSubmitReview = useCallback(formValues => {
    requestSubmitReview({ formValues, modifiedReviewId })
  }, [modifiedReviewId])

  const renderReviewFormSection = useCallback(formProps => {
    const { form: { reset }, handleSubmit } = formProps
    const canSubmit = getCanSubmit({ isLoading: isPending, ...formProps })
    return (
      <form
        autoComplete="off"
        disabled={isPending}
        noValidate
        onSubmit={handleSubmit}
      >
        <FormFieldsContainer />
        <FormFooterContainer
          canSubmit={canSubmit}
          onCancel={reset}
        />
      </form>
    )
  }, [isPending])

  const [isMount, setIsMount] = useState(false)
  useEffect(() => {
    if (!isMount) {
      requestGetData()
      setIsMount(true)
    }
  }, [requestGetData, isMount])

  useEffect(() => {
    const { id } = formInitialValues || {}
    if (isCreatedEntity && id) {
      history.push(`/reviews/${id}?modification`)
    }
  }, [formInitialValues, history, isCreatedEntity])


  return (
    <>
      <HeaderContainer />
      <MainContainer name="review">
        <div className="container">
          <h1 className="title">
            Article Review
          </h1>

          {article && (
            <section>
              <ArticleItemContainer
                article={article}
                noControl
              />
            </section>)}

          <section>
            <Form
              initialValues={formInitialValues}
              onSubmit={handleSubmitReview}
              render={renderReviewFormSection}
            />
          </section>
        </div>
      </MainContainer>
    </>
  )
}

Review.defaultProps = {
  article: null,
  formInitialValues: null
}

Review.propTypes = {
  article: articleType,
  form: PropTypes.shape({
    id: PropTypes.string,
    isCreatedEntity: PropTypes.bool.isRequired
  }).isRequired,
  formInitialValues: PropTypes.shape(),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  requestGetData: PropTypes.func.isRequired,
  requestSubmitReview: PropTypes.func.isRequired,
  query: PropTypes.shape({
    getParams: PropTypes.func.isRequired
  }).isRequired
}

export default Review
