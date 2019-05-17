import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import RoleButtonContainer from './RoleButton/RoleButtonContainer'

const roleTypes = ['admin', 'editor', 'guest', 'reviewer']

const RolesManager = ({ user }) => (
  <Fragment>
    {roleTypes.map(roleType => (
      <RoleButtonContainer
        key={roleType}
        roleType={roleType}
        user={user}
      />
    ))}
  </Fragment>
)

RolesManager.propTypes = {
  user: PropTypes.shape().isRequired
}

export default RolesManager
