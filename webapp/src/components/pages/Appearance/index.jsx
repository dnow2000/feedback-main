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
import { useQuery } from 'with-react-query'

import ClaimItem from 'components/layout/ClaimItem'
import ArticleItem from 'components/layout/ArticleItem'
import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import requests from 'reducers/requests'
import { getCanSubmit } from 'utils/form'
import { scrapDecorator } from 'utils/scrap'

import FormFields from './FormFields'
import FormFooter from './FormFooter'


const ItemsByName = {
  ArticleItem,
  ClaimItem
}

const API_PATH = '/appearances'


export default () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const { params: { sourceId, type } } = useQuery(location.search)
  const Item = ItemsByName[`${type[0].toUpperCase()}${type.slice(1)}Item`]
  const params = useParams()
  const { appearanceId } = params
  const {
    isCreatedEntity,
    isModifiedEntity,
    method
  } = useFormidable(location, params)


  const { isPending } = useSelector(state => state.requests['/articles']) || {}

  const appearance = useSelector(state =>
    selectEntityByKeyAndId(state, 'appearances', appearanceId)) || {}


  const trending = useSelector(state =>
    selectEntitiesByKeyAndJoin(
      state,
      'trendings',
      { key: 'id', value: sourceId }
  )[0])
  const itemProps = useMemo(() => ({ [type]: trending }), [trending, type])


  const handleSubmit = useCallback(formValues => {
    let apiPath = API_PATH
    if (isModifiedEntity) {
      apiPath = `${apiPath}/${appearanceId}`
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
          history.push(`/appearances/${datum.id}`)
        },
        method
      }))
    })
  }, [appearanceId, dispatch, history, method, isModifiedEntity])

  const renderForm = useCallback(formProps => {
    const { form: { reset }, handleSubmit, validating } = formProps
    const canSubmit = getCanSubmit({ isLoading: isPending, ...formProps })
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
      apiPath: `/appearances/${appearanceId}`
    }))
  }, [appearanceId, dispatch, isCreatedEntity])

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
      <Main name="article">
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
              initialValues={appearance || false}
              onSubmit={handleSubmit}
              render={renderForm}
            />
          </section>
        </div>
      </Main>
    </>
  )
}
