import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import userType from 'components/types/userType'

import RoleButton from './RoleButton'


const RolesManager = ({ user }) => {
  const dispatch = useDispatch()

  const roleTypes = useSelector(state => state.data.roleTypes)

  useEffect(() = {
    if (roleTypes.length > 0) return
    dispatch(requestData({ apiPath: '/roleTypes' }))
  }, [dispatch, roleTypes])

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

RolesManager.propTypes = {
  user: userType.isRequired
}

export default RolesManager
