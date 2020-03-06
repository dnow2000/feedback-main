import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'

import selectRoleByUserIdAndType from 'selectors/selectRoleByUserIdAndType'

const RoleButton = ({ toggleRole, role, roleType }) => {
  const { id: userId } = user || {}


  const { id: roleId } = useSelector(state =>
    selectRoleByUserIdAndType(state, userId, roleType.value)) || {}


  const handleClick = useCallback(() => {
      const roleIsAlreadyActivated = typeof roleId !== "undefined"

      let apiPath = "/roles"
      if (roleIsAlreadyActivated) {
        apiPath = `${apiPath}/${roleId}`
      }

      const method = roleIsAlreadyActivated
        ? "DELETE"
        : "POST"

      let body
      if (!roleIsAlreadyActivated) {
        body = {
          type: roleType.value,
          userId
        }
      }

      dispatch(requestData({
        apiPath,
        body,
        method
      }))
    }, [roleId, roleType])

  return (
    <button
      className={classnames("button", {
        checked: roleId,
        "not-checked": !roleId
      })}
      onClick={handleClick}
      type="button"
    >
      {roleType.value}
    </button>
  )
}


RoleButton.propTypes = {
  roleType: PropTypes.shape().isRequired
}

export default RoleButton
