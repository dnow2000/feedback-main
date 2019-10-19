import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'

const FormFooter = ({ canSubmit, isLoading }) => (
  <footer className="field buttons-field">
    <button
      className={classnames('button is-primary', {
        'is-loading': isLoading,
      })}
      disabled={!canSubmit}
      type="submit"
    >
      <span className="is-block">
        Sign up
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
