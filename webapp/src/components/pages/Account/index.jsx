import React, { useCallback } from 'react'
import { Form as ReactFinalForm } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { requestData } from 'redux-thunk-data'
import { resolveCurrentUser, selectCurrentUser } from 'with-react-redux-login'

import Header from 'components/layout/Header'
import Main from 'components/layout/Main'
import requests from 'reducers/requests'

import Form from './Form'

const API_PATH = '/users'

export default () => {
  const dispatch = useDispatch()

  const { firstName, lastName, email, ...other } = useSelector(selectCurrentUser) || {}
  const initialValues = {
    email,
    firstName,
    lastName,
  }


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
    <>
      <Header />
      <Main className="account">
        <div className="container">
          <section>
            <ReactFinalForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              render={Form}
            />
          </section>
        </div>
      </Main>
    </>
  )
}
