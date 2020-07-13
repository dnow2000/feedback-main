import React, { useCallback, useEffect } from 'react'
import { Form as ReactFinalForm } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import {
  requestData,
  selectEntityByKeyAndId,
  selectEntitiesByKeyAndJoin
} from 'redux-thunk-data'
import { useFormidable } from 'with-react-formidable'

import useLocationURL from 'components/uses/useLocationURL'
import requests from 'reducers/requests'

import Form from './Form'


const API_PATH = '/verdicts'


export default () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const { isCreatedEntity, method, readOnly } = useFormidable(location, params)
  const locationURL = useLocationURL()
  const sourceId = locationURL.searchParams.get('sourceId')
  const { verdictId } = params
  let title
  if (isCreatedEntity) {
    title = 'Create a verdict'
  } else if (readOnly) {
    title = 'See the verdict'
  } else {
    title = "Edit the verdict"
  }

  const trending = useSelector(state =>
    selectEntitiesByKeyAndJoin(
      state,
      'trendings',
      { key: 'sourceId', value: sourceId }
  )[0])

  const verdict = useSelector(state =>
    selectEntityByKeyAndId(state, 'verdicts', verdictId))
  const { contentId } = verdict || {}

  const content = useSelector(state =>
    selectEntityByKeyAndId(state, 'contents', contentId))

  const {
    externalThumbUrl: contentExternalThumUrl,
    summary: contentSummary,
    title: contentTitle,
    url: contentUrl,
  } = { ...trending, ...content}
  const currentUserVerdictPatch = {
      contentExternalThumUrl,
      contentSummary,
      contentTitle,
      contentUrl,
      ...verdict
  }


  const handleSubmit = useCallback(formValues => {
    const { id } = currentUserVerdictPatch || {}
    const apiPath = `${API_PATH}/${id || ''}`
    return new Promise(resolve => {
      dispatch(requestData({
        apiPath,
        body: { ...formValues },
        handleFail: (beforeState, action) =>
          resolve(requests(beforeState.requests, action)[API_PATH].errors),
        handleSuccess: (state, action) => {
          const { payload: { datum } } = action
          const createdVerdictId = datum.id
          resolve()
          const nextUrl = `/verdicts/${createdVerdictId}`
          history.push(nextUrl)
        },
        method
      }))
    })
  }, [currentUserVerdictPatch, dispatch, history, method])


  useEffect(() => {
    if (!sourceId) return
    dispatch(requestData({ apiPath: `/trendings/${sourceId}`}))
  }, [dispatch, sourceId])

  useEffect(() => {
    const { id } = currentUserVerdictPatch || {}
    if (isCreatedEntity && id) {
      history.push(`/verdicts/${id}?modification`)
    }
  })


  return (
    <>
      <section className="hero">
        <h1 className="title">
          {title}
        </h1>
      </section>
      <ReactFinalForm
        initialValues={currentUserVerdictPatch}
        onSubmit={handleSubmit}
        render={Form}
      />
    </>
  )
}
