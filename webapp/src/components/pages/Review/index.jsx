import React, { useCallback, useEffect } from 'react'
import { Form as ReactFinalForm } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { requestData, selectEntityByKeyAndId } from 'redux-thunk-data'
import { useFormidable } from 'with-react-formidable'
import { useQuery } from 'with-react-query'

import ArticleItem from 'components/layout/ArticleItem'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import requests from 'reducers/requests'

import { articleNormalizer, reviewNormalizer } from 'utils/normalizers'

import Form from './Form'
import selectFormInitialValuesByArticleId from './selectors/selectFormInitialValuesByArticleId'


const API_PATH = '/reviews'


export default () => {
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


  const handleSubmitReview = useCallback(formValues => {
    let apiPath = API_PATH
    if (isModifiedEntity) {
      apiPath = `${apiPath}/${formReviewId}`
    }
    return new Promise(resolve => {
      dispatch(requestData({
        apiPath,
        body: formValues,
        handleFail: (beforeState, action) =>
          resolve(requests(beforeState.requests, action)[API_PATH].errors),
        handleSuccess: (beforeState, action) => {
          const { payload: { datum } } = action
          const createdReviewId = datum.id
          resolve()
          const nextUrl = `/reviews/${createdReviewId}`
          history.push(nextUrl)
        },
        method,
        tag: API_PATH,
      }))
    })
  }, [dispatch, formReviewId, history, isModifiedEntity, method])


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
      <Header />
      <Main name="review">
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
            <ReactFinalForm
              initialValues={formInitialValues}
              onSubmit={handleSubmitReview}
              render={Form}
            />
          </section>
        </div>
      </Main>
    </>
  )
}
