import classnames from 'classnames'
import React from 'react'
import { useForm } from 'react-final-form'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { canSubmitFromFormState } from 'utils/form'


export default () => {
  const { getState } = useForm()
  const { roleType } = useParams()


  const { isPending } = useSelector(state =>
    state.requests['/users/signup']) || {}


  const canSubmit = canSubmitFromFormState({ isLoading: isPending, ...getState() }) || true


  return (
    <div className="submit">
      <button
        className={classnames(
          'button is-primary',
          {'is-disabled': !canSubmit, 'is-loading': isPending }
        )}
        disabled={!canSubmit}
        type="submit"
      >
        <span className="title">
          {roleType
            ? 'Send an application'
            : 'Submit'}
        </span>
      </button>
    </div>
  )
}
