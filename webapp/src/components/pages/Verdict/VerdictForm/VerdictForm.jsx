import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { useFormidable } from 'with-react-formidable'

import FormFieldsContainer from './FormFields/FormFieldsContainer'
import FormFooter from './FormFooter'


const VerdictForm = ({ ...formProps }) => {
  const location = useLocation()
  const params = useParams()
  const { isCreatedEntity } = useFormidable(location, params)

  const { isPending } = useSelector(state =>
    state.requests['/verdicts']) || {}

  const { form: { reset }, handleSubmit } = formProps

  const handleFormSubmit = useCallback(event => {
    event.preventDefault()
    handleSubmit(event)
  }, [handleSubmit])

  return (
    <form
      autoComplete="off"
      className="form"
      disabled={isPending}
      noValidate
      onSubmit={handleFormSubmit}
    >
      {!isCreatedEntity && <FormFieldsContainer />}
      <FormFooter {...formProps} />
    </form>
  )
}

export default VerdictForm
