import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { scrollToInput } from 'utils/scroll'

import Fields from './Fields'
import Footer from './Footer'


const API_PATH = '/users/signup'


export default ({ errors: formErrors, form, handleSubmit, ...formProps }) => {
  const history = useHistory()
  const { batch, change, getRegisteredFields } = form


  const {
    errors: requestErrors,
    isError: isRequestError,
    isSuccess: isRequestSuccess
  } = useSelector(state => state.requests[API_PATH]) || {}
  const { global: globalError } = requestErrors || {}


  const handleImageChange = useCallback((thumb, croppingRect) => {
    batch(() => {
      change('thumb', thumb)
      change('croppingRect', croppingRect)
    })
  }, [batch, change])

  const handleSubmitWithScrollToFormError = useCallback(event => {
      handleSubmit(event)
      const firstFieldErrorName = Object.keys(formErrors)[0]
      if (firstFieldErrorName) scrollToInput(firstFieldErrorName)
  }, [formErrors, handleSubmit])


  useEffect(() => {
    if (isRequestError) {
      const firstFieldErrorName = getRegisteredFields()
                                    .find(fieldName => requestErrors[fieldName])
      if (firstFieldErrorName) scrollToInput(firstFieldErrorName)
    }
  }, [getRegisteredFields, isRequestError, requestErrors])

  useEffect(() => {
    if (isRequestSuccess) history.push(`/landing`)
  }, [history, isRequestSuccess])


  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmitWithScrollToFormError}
    >
      <Fields onImageChange={handleImageChange} />
      <Footer {...formProps} />
      {globalError !== null && (
        <span>
          {globalError}
        </span>
      )}
    </form>
  )
}
