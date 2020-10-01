import React from 'react'
import PropTypes from 'prop-types'

// import { useHistory } from 'react-router-dom'
// import { useSelector } from 'react-redux'


const _ = ({ item: { medium, post } }) => {
  const title = post.summary || post.title

  return (
    <div className='share-item'>
      <img
        alt={`${medium.name} logo`}
        className="icon medium"
        src={medium.logoUrl}
      />
      <span className="share-details">
        <h5 className="share-name">
          {medium.name || 'Untitled group'}
        </h5>
        <small className="share-description">
          {title || 'No description found.'}
        </small>
      </span>
    </div>
  )
}

_.propTypes = {
  item: PropTypes.shape({
    medium: PropTypes.shape({
      logoUrl: PropTypes.string,
      name: PropTypes.string
    }).isRequired,
    post: PropTypes.shape({
      summary: PropTypes.string,
      title: PropTypes.string
    }).isRequired
  }).isRequired
}

export default _
