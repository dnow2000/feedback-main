import Dotdotdot from 'react-dotdotdot'
import PropTypes from 'prop-types'
import React from 'react'

const Tag = ({ theme }) => (
  <Dotdotdot className="tag fs12" clamp={60}>
    #{theme}
  </Dotdotdot>
)

Tag.propTypes = {
  theme: PropTypes.string.isRequired
}

export default Tag
