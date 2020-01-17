import PropTypes from 'prop-types'
import React from 'react'

import Icon from 'components/layout/Icon'
import { API_THUMBS_URL } from 'utils/config'

const Avatar = ({ className, user, whiteHeader, number }) => {
  if (number !== null) {
    console.warn('SHOW NUMBER AVATAR', number) // TODO @quentin
  }
  if (user) {
    const backgroundStyle = {
      backgroundImage: `url('${API_THUMBS_URL}/users/${user.id}')`,
      backgroundSize: 'cover',
    }
    return <div className={className} style={backgroundStyle} />
  }
  return (
    <div className={className}>
      <Icon className={className} name={`ico-user-circled${whiteHeader ? '-w' : ''}.svg`} />
    </div>
  )
}

Avatar.defaultProps = {
  className: 'avatar',
  number: null,
  user: null,
  whiteHeader: null,
}

Avatar.propTypes = {
  className: PropTypes.string,
  number: PropTypes.number,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  whiteHeader: PropTypes.bool,
}

export default Avatar
