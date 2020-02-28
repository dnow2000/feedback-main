import React from 'react'
// import { useSelector } from 'react-redux'
// import { selectCurrentUser } from 'with-react-redux-login'

import Avatar from 'components/layout/Avatar'
import userType from 'components/types/userType'
// import selectRoleByUserIdAndType from 'selectors/selectRoleByUserIdAndType'
// import selectTagsByUserId from 'selectors/selectTagsByUserId'


const UserItem = ({ user }) => {
  const {
    affiliation,
    expertise,
    firstName,
    // id: userId,
    lastName,
    title
  } = (user || {})


  // const { id: currentUserId } = useSelector(selectCurrentUser) || {}

  //const adminRole = useSelector(state =>
  //  selectRoleByUserIdAndType(state, currentUserId, 'admin'))

  // const tags = useSelector(state => selectTagsByUserId(state, userId))


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
  user: null
}

UserItem.propTypes = {
  user: userType
}

export default UserItem
