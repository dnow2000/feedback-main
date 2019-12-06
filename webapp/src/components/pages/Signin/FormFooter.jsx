import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'

const FormFooter = ({ canSubmit, isLoading }) => (
  <button
    className={classnames('button is-primary', {
      'is-loading': isLoading,
    })}
    disabled={!canSubmit}
    type="submit"
  >
      Log In
  </button>
)

FormFooter.defaultProps = {
  canSubmit: false,
  isLoading: false,
}

FormFooter.propTypes = {
  canSubmit: PropTypes.bool,
  isLoading: PropTypes.bool,
}

export default FormFooter
