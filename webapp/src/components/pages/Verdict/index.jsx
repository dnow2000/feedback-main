import React, { useCallback, useEffect } from 'react'
import { Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import {
  requestData,
  selectEntityByKeyAndId,
  selectEntitiesByKeyAndJoin
} from 'redux-thunk-data'
import { useFormidable } from 'with-react-formidable'
import { useQuery } from 'with-react-query'

import HeaderContainer from 'components/layout/Header/HeaderContainer'
import MainContainer from 'components/layout/Main/MainContainer'
import parseSubmitErrors from 'utils/form/parseSubmitErrors'
import { verdictNormalizer } from 'utils/normalizers'

import VerdictForm from './VerdictForm/VerdictForm'

const Verdict = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const { isCreatedEntity, method, readOnly } = useFormidable(location, params)
  const query = useQuery(location.search)
  const { verdictId } = params
  const { params: { buzzsumoId } } = query

  const trending = useSelector(state =>
    selectEntitiesByKeyAndJoin(
      state,
      'trendings',
      { key: 'buzzsumoId', value: buzzsumoId }
  )[0])

  const verdict = useSelector(state =>
    selectEntityByKeyAndId(state, 'verdicts', verdictId))
  const { articleId } = verdict || {}

  const article = useSelector(state =>
    selectEntityByKeyAndId(state, 'articles', articleId))
  const {
    externalThumbUrl: articleExternalThumUrl,
    summary: articleSummary,
    title: articleTitle,
    url: articleUrl,
  } = { ...trending, ...article}
  const currentUserVerdictPatch = {
      articleExternalThumUrl,
      articleSummary,
      articleTitle,
      articleUrl,
      ...verdict
  }

  const handleSubmitVerdict = useCallback(formValues => {
    const { id } = currentUserVerdictPatch || {}
    const apiPath = `/verdicts/${id || ''}`
    return new Promise(resolve => {
      dispatch(requestData({
        apiPath,
        body: { ...formValues },
        handleFail: (state, action) => {
          const { payload } = action
          const errors = parseSubmitErrors(payload.errors)
          resolve(errors)
        },
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
    dispatch(requestData({ apiPath: '/evaluations' }))
    dispatch(requestData({ apiPath: '/tags' }))

    if (!isCreatedEntity) {
      dispatch(requestData({
        apiPath: `/verdicts/${verdictId}`,
        isMergingDatum: true,
        normalizer: verdictNormalizer,
      }))
    }

    if (buzzsumoId) {
      dispatch(requestData({ apiPath: `/trendings/${buzzsumoId}`}))
    }

  }, [buzzsumoId, dispatch, isCreatedEntity, verdictId])


  useEffect(() => {
    const { id } = currentUserVerdictPatch || {}
    if (isCreatedEntity && id) {
      history.push(`/verdicts/${id}?modification`)
    }
  })

  let title
  if (isCreatedEntity) {
    title = 'Create a verdict'
  } else if (readOnly) {
    title = 'See the verdict'
  } else {
    title = "Edit the verdict"
  }
  return (
    <>
      <HeaderContainer />
      <MainContainer name="verdict">
        <div className="container">
          <section className="hero">
            <h1 className="title">
              {title}
            </h1>
          </section>
          <Form
            initialValues={currentUserVerdictPatch}
            onSubmit={handleSubmitVerdict}
            render={VerdictForm}
          />
        </div>
      </MainContainer>
    </>
  )
}


export default Verdict
