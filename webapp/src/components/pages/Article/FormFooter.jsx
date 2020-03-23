import classnames from 'classnames'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useHistory, useLocation, useParams } from 'react-router-dom'
import { useFormidable } from 'with-react-formidable'
import { selectCurrentUser } from 'with-react-redux-login'

import selectRoleByUserIdAndType from 'selectors/selectRoleByUserIdAndType'


export default ({
  canSubmit,
  onCancel
}) => {
  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const { articleId } = params
  const {
    isCreatedEntity,
    modificationUrl,
    readOnly,
  } = useFormidable(location, params)


  const { isPending } = useSelector(state => state.requests['/articles']) || {}

  const currentUser = useSelector(selectCurrentUser)
  const { id: currentUserId } = currentUser || {}

  const editorRole = useSelector(state =>
    selectRoleByUserIdAndType(state, currentUserId, 'editor'))
  const canEdit = typeof editorRole !== 'undefined'


  const handleCancelClick = useCallback(() => {
    onCancel()
    const next = isCreatedEntity ? '/articles' : `/articles/${articleId}`
    history.push(next)
  }, [articleId, history, isCreatedEntity, onCancel])

  const handleModifyClick = useCallback(() => {
    history.push(modificationUrl)
  }, [history, modificationUrl])


  return (
    <div className="form-footer">
      {canEdit && (
        <>
          {readOnly ? (
            <button
              id="edit-article"
              onClick={handleModifyClick}
              type="button"
            >
              Edit Article
            </button>
          ) : (
            <button
              id="cancel-article"
              onClick={handleCancelClick}
              type="button"
            >
              Cancel
            </button>
          )}
        </>
      )}
      {readOnly ? (
        <NavLink to="/articles">
          Return
        </NavLink>
      ) : (
        <button
          className={classnames({
            'is-disabled': !canSubmit,
            'is-loading': isPending,
          })}
          disabled={!canSubmit}
          id="submit-article"
          type="submit"
        >
          Save Article
        </button>
      )}
    </div>
  )
}
