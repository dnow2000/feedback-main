import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

const FormFooter = ({ canSubmit, isLoading, match, query }) => {
  const {
    params: { reviewId },
  } = match
  const { isCreatedEntity, readOnly } = query.context()

  return (
    <div className="control level">
      {readOnly ? (
        <NavLink
          className="button is-primary"
          id="edit-review"
          to={`/reviews/${reviewId}?edit`}
        >
          Edit Review
        </NavLink>
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
