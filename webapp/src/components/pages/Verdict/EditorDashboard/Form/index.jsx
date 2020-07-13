import React from 'react'
import { useSelector } from 'react-redux'

import Fields from './Fields'
import Footer from './Footer'


export default ({ handleSubmit, ...formProps }) => {
  const { isPending } = useSelector(state =>
    state.requests['/verdicts']) || {}

  return (
    <form
      autoComplete="off"
      className="form"
      disabled={isPending}
      noValidate
      onSubmit={handleSubmit}
    >
      <Fields />
      <Footer {...formProps} />
    </form>
  )
}
