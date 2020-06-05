import capitalize from 'lodash.capitalize'
import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

const roleTypes = ['editor', 'reviewer']


export default () => {
  const { roleType: selectedRoleType } = useParams()
  return (
    <div className="application-bar">
      <div className="question">
        Do you want to apply with a specific role ?
      </div>
      <div className="buttons">
        {roleTypes.map(roleType => (
          <NavLink
            key={roleType}
            to={`/signup/apply/${roleType}`}
          >
            {`Apply as ${capitalize(roleType)}`}
          </NavLink>
        ))}
        <div className="separator" />
        <NavLink
          key="user"
          to="/signup/apply"
        >
          {`Apply as a simple User`}
        </NavLink>
      </div>
    </div>
  )
}
