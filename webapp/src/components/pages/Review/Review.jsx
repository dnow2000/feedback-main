import PropTypes from 'prop-types'
import React, { useCallback, useEffect } from 'react'
import { Form } from 'react-final-form'
import { requestData } from 'redux-thunk-data'

import ArticleItem from 'components/layout/ArticleItem'
import HeaderContainer from 'components/layout/Header/HeaderContainer'
import MainContainer from 'components/layout/Main/MainContainer'
import articleType from 'components/types/articleType'
import getCanSubmit from 'utils/form/getCanSubmit'
import parseSubmitErrors from 'utils/form/parseSubmitErrors'
import { articleNormalizer, reviewNormalizer } from 'utils/normalizers'

import FormFooterContainer from './FormFooter/FormFooterContainer'
import FormFieldsContainer from './FormFields/FormFieldsContainer'

const Review = ({
  article,
  dispatch,
  formidable: { id: reviewId, isCreatedEntity, isModifiedEntity, method },
  formInitialValues,
  history,
  isPending,
  query
}) => {
  const { articleId } = query.getParams()

  const handleSubmitReview = useCallback(formValues => {
    let apiPath = "/reviews"
    if (isModifiedEntity) {
      apiPath = `${apiPath}/${reviewId}`
    }
    return new Promise(resolve => {
      dispatch(requestData({
        activityTag: '/reviews',
        apiPath,
        body: { ...formValues },
        handleFail: (state, action) => {
          const { payload } = action
          const errors = parseSubmitErrors(payload.errors)
          resolve(errors)
        },
        handleSuccess: (state, action) => {
          const { payload: { datum } } = action
          const createdReviewId = datum.id
          resolve()
          const nextUrl = `/reviews/${createdReviewId}`
          history.push(nextUrl)
        },
        method
      }))
    })
  }, [dispatch, history, isModifiedEntity, method, reviewId])

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


  useEffect(() => {
    dispatch(requestData({ apiPath: '/evaluations' }))
    dispatch(requestData({ apiPath: '/tags?scopes=review' }))

    if (!isCreatedEntity) {
      dispatch(requestData({
        apiPath: `/reviews/${reviewId}`,
        normalizer: reviewNormalizer }))
      return
    }

    if (!articleId) return

    dispatch(requestData({
      apiPath: `/articles/${articleId}`,
      normalizer: articleNormalizer }))
  }, [articleId, dispatch, isCreatedEntity, reviewId])

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
              <ArticleItem
                article={article}
                noControl
                withTheme
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
  dispatch: PropTypes.func.isRequired,
  formidable: PropTypes.shape({
    id: PropTypes.string,
    isCreatedEntity: PropTypes.bool.isRequired
  }).isRequired,
  formInitialValues: PropTypes.shape(),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  query: PropTypes.shape({
    getParams: PropTypes.func.isRequired
  }).isRequired
}

export default Review
