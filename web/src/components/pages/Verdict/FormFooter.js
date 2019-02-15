import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

import { selectNewOrEditEntityContextFromLocation } from '../../form/utils'

const FormFooter = ({ canSubmit, location, match, isLoading }) => {
  const {
    params: { verdictId },
  } = match
  const newOrEditEntityContext = selectNewOrEditEntityContextFromLocation(
    location
  )
  const { isNewEntity, readOnly } = newOrEditEntityContext || {}

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
          to={isNewEntity ? '/articles' : `/verdicts/${verdictId}`}
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
          {isNewEntity ? 'Start Verdict' : 'Submit'}
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
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

export default withRouter(FormFooter)
