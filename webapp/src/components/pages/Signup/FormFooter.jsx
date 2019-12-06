import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'

const FormFooter = ({ canSubmit, isLoading }) => (
  <footer className="field submit">
    <button
      className={classnames(
        'button is-primary',
        {'is-disabled': !canSubmit, 'is-loading': isLoading }
      )}
      disabled={!canSubmit}
      type="submit"
    >
      <span className="title">
        Send an application
      </span>
    </button>
  </footer>
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
