import React from 'react'
import { useSelector } from 'react-redux'

import Fields from './Fields'
import Footer from './Footer'


export default ({ handleSubmit }) => {
  const { isPending } = useSelector(state => state.requests['/reviews']) || {}

  return (
    <form
      autoComplete="off"
      disabled={isPending}
      noValidate
      onSubmit={handleSubmit}
    >
      <Fields />
      <Footer />
    </form>
  )
}
