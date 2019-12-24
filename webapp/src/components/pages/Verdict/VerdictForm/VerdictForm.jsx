import React, { useCallback } from 'react'

import getCanSubmit from 'utils/form/getCanSubmit'
import parseSubmitErrors from 'utils/form/parseSubmitErrors'

import FormFieldsContainer from './FormFields/FormFieldsContainer'
import FormFooterContainer from './FormFooter/FormFooterContainer'

const VerdictForm = ({ isCreatedEntity, isPending, ...formProps }) => {
    const canSubmit = !isPending && (
      isCreatedEntity ||
      getCanSubmit(formProps)
    )
    const { form, handleSubmit } = formProps

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
        <FormFooterContainer
          canSubmit={canSubmit}
          form={form}
        />
      </form>
    )
}

export default VerdictForm
