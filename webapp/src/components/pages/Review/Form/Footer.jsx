import classnames from 'classnames'
import React, { useCallback } from 'react'
import { useForm } from 'react-final-form'
import { useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useFormidable } from 'with-react-formidable'

import { getCanSubmit } from 'utils/form'


export default ({ onCancel }) => {

  const { getState: getFormProps, reset } = useForm()
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
  const canSubmit = getCanSubmit({ isLoading: isPending, ...getFormProps() })


  const handleCancelClick = useCallback(() => {
    reset()
    onCancel()
    const next = isCreatedEntity ? '/sources' : `/reviews/${reviewId}`
    history.push(next)
  }, [onCancel, history, isCreatedEntity, reset, reviewId])

  const handleModifyClick = useCallback(() => {
    history.push(modificationUrl)
  }, [history, modificationUrl])


  return (
    <div className="form-footer">
      {readOnly ? (
        <>
          <NavLink
            className="is-secondary"
            id="return"
            to="/sources"
          >
            Return
          </NavLink>
          <button
            className="thin"
            id="modification"
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
            id="cancel"
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
            id="submit"
            type="submit"
          >
            Save review
          </button>

        </>
      )}

    </div>
  )
}
