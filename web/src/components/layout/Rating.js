import PropTypes from 'prop-types'
import React from 'react'

const Rating = ({ value }) => (
  <div className={`rating value-${value}`}>
    {value}
  </div>
)

Rating.propTypes = {
  value: PropTypes.number.isRequired
}

export default Rating
