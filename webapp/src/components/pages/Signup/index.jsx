import React, { useCallback } from 'react'
import { Form } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { requestData } from 'redux-thunk-data'
import { resolveCurrentUser } from 'with-react-redux-login'

import Main from 'components/layout/Main'
import requests from 'reducers/requests'

import ApplicationTypeButtons from './ApplicationTypeButtons'
import SignupForm from './SignupForm'


const API_PATH = '/users/signup'


export default () => {
  const dispatch = useDispatch()


  const handleSubmit = useCallback(formValues => {
    const { thumb, croppingRect } = formValues
    const body = new FormData()
    body.append('thumb', thumb)
    body.append('croppingRect[x]', croppingRect.x)
    body.append('croppingRect[y]', croppingRect.y)
    body.append('croppingRect[height]', croppingRect.height)
    Object.keys(formValues).forEach(key => {
      if (key === 'thumb' || key === 'croppingRect') {
        return
      }
      body.append(key, formValues[key])
    })

    return new Promise(resolve => {
      dispatch(requestData({
        apiPath: API_PATH,
        body,
        handleFail: (beforeState, action) =>
          resolve(requests(beforeState.requests, action)[API_PATH].errors),
        method: 'POST',
        resolve: resolveCurrentUser
      }))
    })
  }, [dispatch])


  return (
    <Main name="signup">
      <div className="container">
        <h1 className="title">
          {`Get on board!`}
        </h1>
        {null && <ApplicationTypeButtons />}
        <Form
          onSubmit={handleSubmit}
          render={SignupForm}
        />
      </div>
    </Main>
  )
}
