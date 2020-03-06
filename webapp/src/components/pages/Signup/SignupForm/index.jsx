import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { scrollToError } from 'utils/scroll'

import Fields from './Fields'
import Footer from './Footer'


export default ({ errors, form, handleSubmit, ...formProps }) => {
  const { batch, change } = form
  const errorIds = Object.keys(errors)


  const { globalError } = useSelector(state =>
    state.errors['/users/signup']) || {}


  const handleImageChange = useCallback((thumb, croppingRect) => {
    batch(() => {
      change('thumb', thumb)
      change('croppingRect', croppingRect)
    })
  }, [batch, change])

  const handleSubmitAndScrollIfNeeded = useCallback(event => {
    handleSubmit(event)
    if (errorIds.length > 0) {
      const fieldErrorId = errorIds[0]  // TODO @colas: get top error
      scrollToError(fieldErrorId)
    }
  }, [errorIds, handleSubmit])


  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmitAndScrollIfNeeded}
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
