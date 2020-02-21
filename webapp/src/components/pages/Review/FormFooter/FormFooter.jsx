import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { NavLink } from 'react-router-dom'

const FormFooter = ({
  canSubmit,
  formidable,
  history,
  isPending,
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
  } = formidable

  const handleModifyClick = useCallback(() => {
    history.push(modificationUrl)
  }, [history, modificationUrl])

  return (
    <div className="form-footer">
      {readOnly ? (
        <>
          <NavLink
            className="is-secondary"
            id="return-review"
            to="/articles"
          >
            Return
          </NavLink>
          <button
            className="thin"
            id="modification-review"
            onClick={handleModifyClick}
            type="button"
          >
            Modify Review
          </button>
        </>
      ) : (
        <>
          <button
            className="is-secondary"
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
          <button
            className={classnames({
              'is-disabled thin': !canSubmit,
              'is-loading thin': isPending,
            })}
            disabled={!canSubmit}
            id="create-review"
            type="submit"
          >
            Save review
          </button>

        </>
      )}

    </div>
  )
}

FormFooter.defaultProps = {
  canSubmit: false,
  isPending: false,
}

FormFooter.propTypes = {
  canSubmit: PropTypes.bool,
  formidable: PropTypes.shape({
    isCreatedEntity: PropTypes.bool.isRequired,
    modificationUrl: PropTypes.string,
    readOnly: PropTypes.bool.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isPending: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      reviewId: PropTypes.string
    })
  }).isRequired,
  onCancel: PropTypes.func.isRequired
}

export default FormFooter
