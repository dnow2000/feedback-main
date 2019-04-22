import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

const FormFooter = ({ canSubmit, isLoading, match, query }) => {
  const {
    params: { reviewId },
  } = match
  const { isCreatedEntity, readOnly } = query.context({ id:reviewId })
  return (
    <div className="control level">
      {readOnly ? (
        <button
          className="button is-primary"
          id="modification-review"
          onClick={() => query.changeToModification()}
          type="button"
        >
          Modify Review
        </button>
      ) : (
        <NavLink
          className="button is-secondary"
          id="cancel-review"
          to={isCreatedEntity ? '/articles' : `/reviews/${reviewId}`}
        >
          Cancel
        </NavLink>
      )}
      {readOnly ? (
        <NavLink className="button is-secondary" to="/articles">
          Return
        </NavLink>
      ) : (
        <button
          className={classnames('button is-primary flex-1', {
            'is-loading': isLoading,
          })}
          disabled={!canSubmit}
          id="submit-review"
          type="submit"
        >
          Submit
        </button>
      )}
    </div>
  )
}

FormFooter.defaultProps = {
  canSubmit: false,
  isLoading: false,
}

FormFooter.propTypes = {
  canSubmit: PropTypes.bool,
  isLoading: PropTypes.bool,
  match: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired
}

export default FormFooter
