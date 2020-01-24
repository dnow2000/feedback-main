import PropTypes from 'prop-types'
import React from 'react'
import Dotdotdot from 'react-dotdotdot'

import Avatar from 'components/layout/Avatar'
import userType from 'components/types/userType'

import RolesManagerContainer from './RolesManager/RolesManagerContainer'

const UserItem = ({
  adminRole,
  user,
  tags,
}) => {
  const {
    affiliation,
    expertise,
    firstName,
    id,
    lastName,
    title
  } = (user || {})

  return (
    <article className="user-item">
      <div className="user-info-container">
        <div className="avatar-container">
          <div>
            <Avatar user={user} />
          </div>
        </div>
        <div className="info-container">
          <p className="user-name">
            {firstName} {lastName}
          </p>
          <p className="user-title">
            {title}, {affiliation}
          </p>
          <p className="user-specialities">
            {expertise}
          </p>
        </div>
      </div>
      <div className="cta-container">
        <button className="button is-primary thin">
          View Profile
        </button>
      </div>

    </article>
  )
}

UserItem.defaultProps = {
  adminRole: null,
  tags: null,
  user: null
}

UserItem.propTypes = {
  adminRole: PropTypes.shape(),
  match: PropTypes.shape().isRequired,
  tags: PropTypes.array,
  user: userType
}

export default UserItem
