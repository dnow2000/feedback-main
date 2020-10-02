import React from 'react'
import PropTypes from 'prop-types'

import { numberShortener, stringShortener } from 'utils/shorteners'


const _ = ({ item: { medium, post } }) => {
  const title = stringShortener(post.summary || post.title, 240)
  const interactions = numberShortener(post.totalInteractions)
  const shares = numberShortener(post.totalShares)

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
        <div className="share-footer">
          <small className="text-muted">
            {`${shares} shares`}
          </small>
          <small className="text-muted">
            {`${interactions} interactions`}
          </small>
        </div>
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
      title: PropTypes.string,
      totalInteractions: PropTypes.number,
      totalShares: PropTypes.number
    }).isRequired
  }).isRequired
}

export default _
