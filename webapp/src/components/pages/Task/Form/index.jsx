import PropTypes from 'prop-types'
import React, { handleSubmit } from 'react'
import { useSelector } from 'react-redux'

import Fields from './Fields'
import Footer from './Footer'


 const _ = ({ handleSubmit }) => {
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

_.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}


export default _
