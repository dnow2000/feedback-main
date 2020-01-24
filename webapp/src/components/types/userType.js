import PropTypes from 'prop-types'

export default PropTypes.shape({
    academicWebsite: PropTypes.string,
    affiliation: PropTypes.string,
    firstName: PropTypes.string,
    id: PropTypes.string.isRequired,
    lastName: PropTypes.string
})
