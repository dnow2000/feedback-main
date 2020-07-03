import PropTypes from 'prop-types'
import React from 'react'

import TextField from './TextField'

const _ = props => {
  const { validating } = props
  return (
    <>
      <TextField className='col-80' {...props} />
      {validating && <button className="button is-loading col-20" type="button" />}
    </>
  )
}

_.defaultProps = {
  validating: false
}

_.propTypes = {
  validating: PropTypes.bool
}

export default _
