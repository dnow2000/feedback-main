import React, { useCallback, useEffect } from 'react'
import { Form as ReactFinalForm } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { requestData, selectEntityByKeyAndId } from 'redux-thunk-data'
import { useFormidable } from 'with-react-formidable'
import { useQuery } from 'with-react-query'

import ContentItem from 'components/layout/ContentItem'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import requests from 'reducers/requests'

import { contentNormalizer, reviewNormalizer } from 'utils/normalizers'

import Form from './Form'
import selectFormInitialValuesByContentId from './selectors/selectFormInitialValuesByContentId'


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
  const { params: { contentId: queryContentId } } = useQuery(location.search)


  const review = useSelector(state =>
    selectEntityByKeyAndId(state, 'reviews', matchReviewId)) || {}
  const contentId = review.contentId || queryContentId
  const content = useSelector(state =>
    selectEntityByKeyAndId(state, 'contents', contentId))

  const formInitialValues = useSelector(state =>
    selectFormInitialValuesByContentId(state, contentId))


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

    if (!contentId) return

    dispatch(requestData({
      apiPath: `/contents/${contentId}`,
      normalizer: contentNormalizer }))
  }, [contentId, dispatch, isCreatedEntity, formReviewId])

  useEffect(() => {
    const { id } = formInitialValues || {}
    if (isCreatedEntity && id) {
      history.push(`/reviews/${id}?modification`)
    }
  }, [formInitialValues, history, isCreatedEntity])


  return (
    <>
      <Header />
      <Main className="review">
        <div className="container">
          <h1 className="title">
            Content Review
          </h1>

          {content && (
            <section>
              <ContentItem
                content={content}
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
