import React, { useCallback, useEffect } from 'react'
import { Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { requestData, selectEntityByKeyAndId } from 'redux-thunk-data'
import { useFormidable } from 'with-react-formidable'
import { useQuery } from 'with-react-query'

import ArticleItem from 'components/layout/ArticleItem'
import HeaderContainer from 'components/layout/Header/HeaderContainer'
import MainContainer from 'components/layout/Main/MainContainer'
import getCanSubmit from 'utils/form/getCanSubmit'
import parseSubmitErrors from 'utils/form/parseSubmitErrors'
import { articleNormalizer, reviewNormalizer } from 'utils/normalizers'

import FormFooter from './FormFooter'
import FormFields from './FormFields'
import selectFormInitialValuesByArticleId from './selectors/selectFormInitialValuesByArticleId'


const Review = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const params = useParams()
  const { reviewId: matchReviewId } = params
  const {
    id: formReviewId,
    isCreatedEntity,
    isModifiedEntity,
    method
  } = useFormidable(location, params)
  const history = useHistory()
  const { params: { articleId: queryArticleId } } = useQuery(location.search)

  const review = useSelector(state =>
    selectEntityByKeyAndId(state, 'reviews', matchReviewId)) || {}
  const articleId = review.articleId || queryArticleId
  const article = useSelector(state =>
    selectEntityByKeyAndId(state, 'articles', articleId))

  const formInitialValues = useSelector(state =>
    selectFormInitialValuesByArticleId(state, articleId))

  const { isPending } = useSelector(state => state.requests['/reviews']) || {}

  const handleSubmitReview = useCallback(formValues => {
    let apiPath = "/reviews"
    if (isModifiedEntity) {
      apiPath = `${apiPath}/${formReviewId}`
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
  }, [dispatch, formReviewId, history, isModifiedEntity, method])

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
        <FormFields />
        <FormFooter
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
        apiPath: `/reviews/${formReviewId}`,
        normalizer: reviewNormalizer }))
      return
    }

    if (!articleId) return

    dispatch(requestData({
      apiPath: `/articles/${articleId}`,
      normalizer: articleNormalizer }))
  }, [articleId, dispatch, isCreatedEntity, formReviewId])

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


export default Review
