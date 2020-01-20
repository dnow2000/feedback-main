import PropTypes from 'prop-types'
import React, { useCallback, useEffect } from 'react'
import { Form } from 'react-final-form'
import { requestData } from 'redux-thunk-data'

import ArticleItemContainer from 'components/layout/ArticleItem/ArticleItemContainer'
import HeaderContainer from 'components/layout/Header/HeaderContainer'
import MainContainer from 'components/layout/Main/MainContainer'
import parseSubmitErrors from 'utils/form/parseSubmitErrors'
import { articleNormalizer, verdictNormalizer } from 'utils/normalizers'

import VerdictForm from './VerdictForm/VerdictForm'

const Verdict = ({
  currentUserVerdictPatch,
  dispatch,
  form: { isCreatedEntity, method, readOnly },
  history,
  isPending,
  match: { params: { verdictId } },
  query: { getParams }
}) => {
  const { buzzsumoId } = getParams()

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

Verdict.defaultProps = {
  article: null,
  currentUserVerdictPatch: null,
  isPending: false
}

Verdict.propTypes = {
  article: PropTypes.shape(),
  currentUserVerdictPatch: PropTypes.shape(),
  dispatch: PropTypes.func.isRequired,
  form: PropTypes.shape({
    isCreatedEntity: PropTypes.bool.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isPending: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape().isRequired
  }).isRequired,
  query: PropTypes.shape().isRequired
}

export default Verdict
