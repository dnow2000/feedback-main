import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

import Controls from './Controls'
import Fields from './Fields'


export default ({ handleSubmit }) => {

  const { isPending } = useSelector(state =>
    state.requests['/links']) || {}

  const handleSubmitWithPreventDefault = useCallback(event => {
    event.preventDefault()
    handleSubmit(event)
  }, [handleSubmit])


  return (
    <form
      className="form"
      disabled={isPending}
      noValidate
      onSubmit={handleSubmitWithPreventDefault}
    >
      <div className="title">
        Declare the new link:
      </div>
      <Fields />
      <Controls />
    </form>
  )
}
