import Dotdotdot from 'react-dotdotdot'
import PropTypes from 'prop-types'
import React from 'react'

const Authors = ({ text }) => (
  <Dotdotdot className="authors" clamp={2}>
    {text}
  </Dotdotdot>
)

Authors.propTypes = {
  text: PropTypes.string.isRequired
}

export default Authors
