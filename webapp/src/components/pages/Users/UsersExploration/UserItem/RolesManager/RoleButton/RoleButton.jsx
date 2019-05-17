import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const RoleButton = ({ toggleRole, role, roleType }) => (
  <button
    className={classnames("button", {
      checked: role,
      "not-checked": !role
    })}
    onClick={toggleRole}
    type="button"
  >
    {roleType}
  </button>
)

RoleButton.defaultProps = {
  role: null
}

RoleButton.propTypes = {
  role: PropTypes.shape(),
  roleType: PropTypes.string.isRequired,
  toggleRole: PropTypes.func.isRequired
}

export default RoleButton
