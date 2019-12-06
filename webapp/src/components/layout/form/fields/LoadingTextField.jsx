import PropTypes from 'prop-types'
import React from 'react'

import { TextField } from './TextField'

export const LoadingTextField = props => {
  const { validating } = props
  return (
    <>
      <TextField className='col-80' {...props} />
      {validating && <button className="button is-loading col-20" type="button" />}
    </>
  )
}

LoadingTextField.defaultProps = {
  validating: false
}

LoadingTextField.propTypes = {
  validating: PropTypes.bool
}

export default LoadingTextField
