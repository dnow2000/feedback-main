import Dotdotdot from 'react-dotdotdot'
import PropTypes from 'prop-types'
import React from 'react'

const Extract = ({ text }) => (
  <Dotdotdot className="extract" clamp={4}>
    {text}
  </Dotdotdot>
)

Extract.propTypes = {
  text: PropTypes.string.isRequired
}

export default Extract
