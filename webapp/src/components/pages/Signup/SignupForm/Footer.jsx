import classnames from 'classnames'
import React from 'react'
import { useSelector } from 'react-redux'

import { getCanSubmit } from 'utils/form'


export default ({ ...formProps }) => {
  const { isPending } = useSelector(state =>
    state.requests['/users/signup']) || {}

  const canSubmit = getCanSubmit({ isLoading: isPending, ...formProps }) || true

  return (
    <footer className="field submit">
      <button
        className={classnames(
          'button is-primary',
          {'is-disabled': !canSubmit, 'is-loading': isPending }
        )}
        disabled={!canSubmit}
        type="submit"
      >
        <span className="title">
          Send an application
        </span>
      </button>
    </footer>
  )
}
