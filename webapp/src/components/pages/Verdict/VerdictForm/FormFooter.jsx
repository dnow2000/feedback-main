import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useFormidable } from 'with-react-formidable'

import { getCanSubmit } from 'utils/form'

const FormFooter = ({...formProps}) => {
  const { form: { reset: formReset } } = formProps
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const { verdictId } = params
  const { isCreatedEntity, readOnly } = useFormidable(location, params)

  const { isPending } = useSelector(state =>
    state.requests['/verdicts']) || {}
  const canSubmit = !isPending && (
    isCreatedEntity ||
    getCanSubmit(formProps)
  )

  const handleCancelClick = useCallback(() => {
    formReset()
    const next = isCreatedEntity
      ? '/articles'
      : `/verdicts/${verdictId}`
    history.push(next)
  }, [formReset, history, isCreatedEntity, verdictId])

  return (
    <div className="form-footer">
      {readOnly ? (
        <NavLink
          className="button is-primary thin"
          id="edit-verdict"
          to={`/verdicts/${verdictId}?modification`}
        >
          Edit Verdict
        </NavLink>
      ) : (
        <button
          className="button is-secondary"
          id="cancel-verdict"
          onClick={handleCancelClick}
          type="button"
        >
          Cancel
        </button>
      )}
      {readOnly ? (
        <NavLink className="button is-secondary" to="/articles">
          Return
        </NavLink>
      ) : (
        <button
          className={classnames('button is-primary thin', {
            'is-loading': isPending,
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

export default FormFooter
