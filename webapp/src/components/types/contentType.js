import PropTypes from 'prop-types'

export default PropTypes.shape({
  id: PropTypes.oneOf(PropTypes.string, PropTypes.number).isRequired
})
