import PropTypes from 'prop-types'
import React from 'react'
import { withRouter } from 'react-router-dom'

import getForm from './getForm'

const withFormRouter = WrappedComponent => {
  const _withFormRouter = props => (
    <WrappedComponent
      form={getForm(props)}
      {...props}
    />
  )

  _withFormRouter.propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape().isRequired
    }).isRequired,
    name: PropTypes.string.isRequired,
  }

  return withRouter(_withFormRouter)
}

export default withFormRouter
