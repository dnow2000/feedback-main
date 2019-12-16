import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { NavLink } from 'react-router-dom'

const FormFooter = ({
  canSubmit,
  form,
  history,
  isLoading,
  match,
  onCancel
}) => {
  const {
    params: { reviewId },
  } = match
  const {
    isCreatedEntity,
    modificationUrl,
    readOnly
  } = form

  const handleModifyClick = useCallback(() => {
    history.push(modificationUrl)
  }, [history, modificationUrl])

  return (
    <div className="form-footer">
      {readOnly ? (
        <NavLink className="return" to="/articles">
          Return
        </NavLink>
      ) : (
        <button
          className={classnames('create', {
            'is-loading': isLoading,
          })}
          disabled={!canSubmit}
          id="submit-review"
          type="submit"
        >
          Save review
        </button>
      )}
      <div className="space" />
      {readOnly ? (
        <button
          className="modify"
          id="modification-review"
          onClick={handleModifyClick}
          type="button"
        >
          Modify Review
        </button>
      ) : (
        <button
          className="button is-secondary"
          id="cancel-review"
          onClick={() => {
            onCancel()
            const next = isCreatedEntity ? '/articles' : `/reviews/${reviewId}`
            history.push(next)
          }}
          type="button"
        >
          Cancel
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
  form: PropTypes.shape({
    isCreatedEntity: PropTypes.bool.isRequired,
    modificationUrl: PropTypes.string,
    readOnly: PropTypes.bool.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      reviewId: PropTypes.string
    })
  }).isRequired,
  onCancel: PropTypes.func.isRequired
}

export default FormFooter
