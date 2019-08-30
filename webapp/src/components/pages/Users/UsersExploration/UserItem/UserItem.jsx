import PropTypes from 'prop-types'
import React from 'react'
import Dotdotdot from 'react-dotdotdot'

import RolesManagerContainer from './RolesManager/RolesManagerContainer'
import AvatarContainer from '../../../../layout/Avatar/AvatarContainer'

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
    <article className="user-item box">
      <div className="content p24">
        <div className="flex-columns items-center">
          <a
            className="anchor flex-columns items-center mr12"
            href={`/users/${id}`}
          >
            <AvatarContainer user={user} />
            <div className="mb4 text-left">
              {publicName}
            </div>
          </a>
          <div className="flex-auto center">
            <div className="flex-start items-center">
              {
                tags.map(({ text }) => (
                  <Dotdotdot className="tag fs12" clamp={60} key={text}>
                    #{text}
                  </Dotdotdot>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <nav className="control flex-wrap flex-start items-center p12">
        {adminRole && <RolesManagerContainer user={user} />}
      </nav>
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
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired,
  tags: PropTypes.array,
  user: PropTypes.shape()
}

export default UserItem
