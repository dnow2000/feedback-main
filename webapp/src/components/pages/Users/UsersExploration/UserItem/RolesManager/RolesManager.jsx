import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import RoleButtonContainer from './RoleButton/RoleButtonContainer'

class RolesManager extends PureComponent {
  componentDidMount () {
    const { requestGetRoleTypes, roleTypes } = this.props
    if (roleTypes.length > 0) {
      return
    }
    requestGetRoleTypes()
  }

  render() {
    const { roleTypes, user } = this.props
    return (
      <>
        {roleTypes.map(roleType => (
          <RoleButtonContainer
            key={roleType.id}
            roleType={roleType}
            user={user}
          />
        ))}
      </>
    )
  }
}

RolesManager.propTypes = {
  requestGetRoleTypes: PropTypes.func.isRequired,
  roleTypes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  user: PropTypes.shape().isRequired
}

export default RolesManager
