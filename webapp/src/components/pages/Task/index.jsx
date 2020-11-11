import React, { useCallback, useEffect } from 'react'
import { Form as ReactFinalForm } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { requestData, selectEntityByKeyAndId } from 'redux-thunk-data'

import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import requests from 'reducers/requests'

import Form from './Form'
import Status from './Status'

const API_PATH = '/tasks'


export default () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const { taskId } = params

  const task = useSelector(state =>
    selectEntityByKeyAndId(state, 'tasks', taskId))

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
      apiPath: `/tasks/${taskId}`
    }))
  },  [dispatch, taskId])


  useEffect(() => {
    dispatch(requestData({ apiPath: '/taskNameOptions' }))
  }, [dispatch])


  return (
    <>
      <Header withLinks />
      <Main className="task">
        <div className="container">
          <h1 className="title">
            TASK
          </h1>
          <Status task={task} />
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
