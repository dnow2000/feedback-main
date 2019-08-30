import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const RoleButton = ({ toggleRole, role, roleType }) => (
  <button
    className={classnames("button", {
      checked: role,
      "not-checked": !role
    })}
    onClick={toggleRole(role)}
    type="button"
  >
    {roleType.value}
  </button>
)

RoleButton.defaultProps = {
  role: null
}

RoleButton.propTypes = {
  role: PropTypes.shape(),
  roleType: PropTypes.shape().isRequired,
  toggleRole: PropTypes.func.isRequired
}

export default RoleButton
