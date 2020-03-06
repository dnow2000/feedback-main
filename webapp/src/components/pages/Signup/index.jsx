import React, { useCallback } from 'react'
import { Form } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'
import { resolveCurrentUser } from 'with-react-redux-login'

import Main from 'components/layout/Main'
import { scrollToError } from 'utils/scroll'

import ApplicationTypeButtons from './ApplicationTypeButtons'
import SignupForm from './SignupForm'


export default () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmitHighLevel = useCallback(formValues => {
    const { thumb, croppingRect } = formValues
    const body = new FormData()
    body.append('thumb', thumb)
    body.append('croppingRect[x]', croppingRect.x)
    body.append('croppingRect[y]', croppingRect.y)
    body.append('croppingRect[height]', croppingRect.height)
    Object.keys(formValues).forEach( key => {
      if (key === 'thumb' || key === 'croppingRect') {
        return
      }
      body.append(key, formValues[key])
    })

    const apiPath = '/users/signup'

    return new Promise(resolve => {
      dispatch(requestData({
        apiPath,
        body,
        handleFail: state => {
          const { errors, fieldErrorId } = state.errors[apiPath]
          resolve(errors)
          if (fieldErrorId) scrollToError(fieldErrorId)
        },
        handleSuccess: () => {
          resolve()
          history.push(`/landing`)
        },
        method: 'POST',
        resolve: resolveCurrentUser
      }))
    })
  }, [dispatch, history])


  return (
    <Main name="signup">
      <div className="container">
        <h1 className="title">
          {`Get on board!`}
        </h1>
        {null && <ApplicationTypeButtons />}
        <Form
          onSubmit={handleSubmitHighLevel}
          render={SignupForm}
        />
      </div>
    </Main>
  )
}
