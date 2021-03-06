import React, { useCallback, useEffect, useMemo } from 'react'
import { Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import {
  requestData,
  selectEntityByKeyAndId,
  selectEntitiesByKeyAndJoin
} from 'redux-thunk-data'
import { useFormidable } from 'with-react-formidable'

import ClaimItem from 'components/layout/ClaimItem'
import ContentItem from 'components/layout/ContentItem'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import useLocationURL from 'components/uses/useLocationURL'
import requests from 'reducers/requests'
import { canSubmitFromFormState } from 'utils/form'
import { scrapDecorator } from 'utils/scrap'

import FormFields from './FormFields'
import FormFooter from './FormFooter'


const ItemsByName = {
  ContentItem,
  ClaimItem
}

const API_PATH = '/links'


export default () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const locationURL = useLocationURL()
  const sourceId = locationURL.searchParams.get('sourceId')
  const type = locationURL.searchParams.get('type')
  const Item = ItemsByName[`${type[0].toUpperCase()}${type.slice(1)}Item`]
  const params = useParams()
  const { linkId } = params
  const {
    isCreatedEntity,
    isModifiedEntity,
    method
  } = useFormidable(location, params)


  const { isPending } = useSelector(state => state.requests['/contents']) || {}

  const link = useSelector(state =>
    selectEntityByKeyAndId(state, 'links', linkId)) || {}


  const trending = useSelector(state =>
    selectEntitiesByKeyAndJoin(state,
                               'trendings',
                               { key: 'id', value: sourceId })[0])
  const itemProps = useMemo(() => ({ [type]: trending }), [trending, type])


  const handleSubmit = useCallback(formValues => {
    let apiPath = API_PATH
    if (isModifiedEntity) {
      apiPath = `${apiPath}/${linkId}`
    }
    return new Promise(resolve => {
      dispatch(requestData({
        apiPath,
        body: { ...formValues },
        handleFail: (beforeState, action) =>
          resolve(requests(beforeState.requests, action)[API_PATH].errors),
        handleSuccess: (state, action) => {
          const { payload: { datum } } = action
          resolve()
          history.push(`/links/${datum.id}`)
        },
        method
      }))
    })
  }, [linkId, dispatch, history, method, isModifiedEntity])

  const renderForm = useCallback(formProps => {
    const { form: { reset }, handleSubmit, validating } = formProps
    const canSubmit = canSubmitFromFormState({ isLoading: isPending, ...formProps })
    return (
      <form
        autoComplete="off"
        className="form"
        disabled={isPending}
        noValidate
        onSubmit={handleSubmit}
      >
        <FormFields validating={validating} />
        <FormFooter
          canSubmit={canSubmit}
          onCancel={reset}
        />
      </form>
    )
  }, [isPending])


  useEffect(() => {
    if (isCreatedEntity) return
    dispatch(requestData({
      apiPath: `/links/${linkId}`
    }))
  }, [linkId, dispatch, isCreatedEntity])

  useEffect(() => {
    if (!sourceId) return
    dispatch(requestData({
      apiPath: `/trendings/${sourceId}?type=${type}`,
      resolve: trending => ({ ...trending, id: trending.source.id })
    }))
  }, [dispatch, sourceId, type])


  return (
    <>
      <Header />
      <Main className="content">
        <div className="container">
          <section>
            <h2 className="subtitle">
              FROM
            </h2>
            <Item {...itemProps} />
          </section>

          <section>
            <h2 className="subtitle">
              DETAILS
            </h2>
            <Form
              decorators={[scrapDecorator]}
              initialValues={link || false}
              onSubmit={handleSubmit}
              render={renderForm}
            />
          </section>
        </div>
      </Main>
    </>
  )
}
