import React, { useCallback, useEffect } from 'react'
import { Form as ReactFinalForm } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { requestData, selectEntitiesByKeyAndJoin } from 'redux-thunk-data'

import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import requests from 'reducers/requests'

import Form from './Form'

const API_PATH = '/tasks'


export default () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const { taskUuid } = params

  const task = useSelector(state =>
    selectEntitiesByKeyAndJoin(state,
                               'tasks',
                               { key: 'uuid', value: taskUuid }))[0] || {}

  const handleSubmit = useCallback(formValues => {
    let apiPath = API_PATH
    return new Promise(resolve => {
      dispatch(requestData({
        apiPath,
        body: formValues,
        handleFail: (beforeState, action) =>
          resolve(requests(beforeState.requests, action)[API_PATH].errors),
        handleSuccess: (beforeState, action) => {
          const { payload: { datum } } = action
          resolve()
          const nextUrl = `/tasks/${datum.id}`
          history.push(nextUrl)
        },
        method: 'POST',
        tag: API_PATH,
      }))
    })
  }, [dispatch, history])


  useEffect(() => {
    dispatch(requestData({
      apiPath: `/tasks/${taskUuid}`
    }))
  },  [dispatch, taskUuid])

  return (
    <>
      <Header withLinks />
      <Main className="task">
        <div className="container">
          <ReactFinalForm
            initialValues={task}
            onSubmit={handleSubmit}
            render={Form}
          />
        </div>
      </Main>
    </>
  )
}
