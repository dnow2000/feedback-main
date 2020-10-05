import React from 'react'
import PropTypes from 'prop-types'

import { numberShortener, stringShortener } from 'utils/shorteners'


const _ = ({ postContent, profileMedium }) => {
  const title = stringShortener(postContent.summary || postContent.title, 240)
  const interactions = numberShortener(postContent.totalInteractions)
  const shares = numberShortener(postContent.totalShares)


  return (
    <div className='share'>
      <img
        alt={`${profileMedium.name} logo`}
        className="icon medium"
        src={profileMedium.logoUrl}
      />
      <span className="share-details">
        <h5 className="share-name">
          {profileMedium.name || 'Untitled group'}
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
  postContent: PropTypes.shape({
    summary: PropTypes.string,
    title: PropTypes.string,
    totalInteractions: PropTypes.number,
    totalShares: PropTypes.number
  }).isRequired,
  profileMedium: PropTypes.shape({
    logoUrl: PropTypes.string,
    name: PropTypes.string
  }).isRequired
}

export default _
