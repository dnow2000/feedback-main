import PropTypes from 'prop-types'
import React from 'react'
import Dotdotdot from 'react-dotdotdot'

import Avatar from 'components/layout/Avatar'

import RolesManagerContainer from './RolesManager/RolesManagerContainer'

const UserItem = ({
  adminRole,
  user,
  tags,
}) => {
  const {
    id,
    publicName,
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
            Martin Parks
          </p>
          <p className="user-title">
            Proffessor associate in UCLA
          </p>
          <p className="user-specialities">
            Cardiology, Vaccines, Hematovirology, Heptatites
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
  user: PropTypes.shape()
}

export default UserItem
