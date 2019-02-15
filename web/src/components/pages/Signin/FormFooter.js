import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const FormFooter = ({ canSubmit, isLoading }) => (
  <footer className="field buttons-field">
    <NavLink className="button is-secondary" to="/signup">
      Sign up
    </NavLink>
    <button
      className={classnames('button is-primary', {
        'is-loading': isLoading,
      })}
      disabled={!canSubmit}
      type="submit"
    >
      <span className="is-block">
Sign In
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
