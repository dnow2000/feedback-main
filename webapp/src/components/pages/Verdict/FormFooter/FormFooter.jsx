import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink } from 'react-router-dom'

const FormFooter = ({ canSubmit, isLoading, match, query }) => {
  const {
    params: { verdictId },
  } = match
  const { isCreatedEntity, readOnly } = query.context()

  return (
    <div className="control level">
      {readOnly ? (
        <NavLink
          className="button is-primary"
          id="edit-verdict"
          to={`/verdicts/${verdictId}?edit`}
        >
          Edit Verdict
        </NavLink>
      ) : (
        <NavLink
          className="button is-secondary"
          id="cancel-verdict"
          to={isCreatedEntity ? '/articles' : `/verdicts/${verdictId}`}
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
          id="submit-verdict"
          type="submit"
        >
          {isCreatedEntity ? 'Start Verdict' : 'Submit'}
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
  query: PropTypes.object.isRequired,
}

export default FormFooter
