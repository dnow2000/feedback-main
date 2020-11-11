import classnames from 'classnames'
import React, { useCallback } from 'react'
import { useForm } from 'react-final-form'
import { useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useFormidable } from 'with-react-formidable'

import { canSubmitFromFormState } from 'utils/form'


export default () => {
  const { getState: getFormProps, reset } = useForm()
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const { isCreatedEntity } = useFormidable(location, params)

  const { isPending } = useSelector(state =>
    state.requests['/tasks']) || {}
  const canSubmit = canSubmitFromFormState({ isLoading: isPending, ...getFormProps() })


  const handleCancel = useCallback(() => {
    reset()
    history.push('/tasks')
  }, [history, reset])


  return (
    <div className="task-footer">
      <button
        className="is-secondary"
        id="cancel"
        onClick={handleCancel}
        type="button"
      >
        Return
      </button>
      {isCreatedEntity && (
        <button
          className={classnames({
            'is-disabled thin': !canSubmit,
            'is-loading thin': isPending,
          })}
          disabled={!canSubmit}
          id="submit"
          type="submit"
        >
          Save Task
        </button>)}
    </div>
  )
}
