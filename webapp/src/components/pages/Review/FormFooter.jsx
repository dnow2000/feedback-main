import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useFormidable } from 'with-react-formidable'

const FormFooter = ({
  canSubmit,
  onCancel
}) => {
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const formidable = useFormidable(location, params)
  const { reviewId } = params
  const {
    isCreatedEntity,
    modificationUrl,
    readOnly
  } = formidable


  const { isPending } = useSelector(state =>
    state.requests['/reviews']) || {}


  const handleCancelClick = useCallback(() => {
    onCancel()
    const next = isCreatedEntity ? '/sources' : `/reviews/${reviewId}`
    history.push(next)
  }, [onCancel, history, isCreatedEntity, reviewId])

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
            to="/sources"
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
            onClick={handleCancelClick}
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
  canSubmit: false
}

FormFooter.propTypes = {
  canSubmit: PropTypes.bool,
  onCancel: PropTypes.func.isRequired
}

export default FormFooter
