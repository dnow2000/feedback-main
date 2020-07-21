import React from 'react'
import PropTypes from 'prop-types'

import { API_URL } from 'utils/config'


const _ = ({ appearance: { quotingContent } }) => {
  const { id, externalThumbUrl, title, url } = quotingContent
  const { hostname } = new URL(url)
  const backUpThumbUrl = `${API_URL}/static/logo.png`


  return (
    <a
      className="anchor appearance-item-container"
      href={url}
      rel='noopener noreferrer'
      target='_blank'
    >
      <img
        alt={id}
        className='appearance-item-img'
        src={externalThumbUrl || backUpThumbUrl}
      />
      <div className="appearance-data">
        <h4 className='appearance-title'>
          {title}
        </h4>
        <p className="text-muted appearance-source">
          <small>
            {hostname}
          </small>
        </p>
        <p className="appearance-url">
          {url}
        </p>
      </div>
    </a>
  )
}

_.propTypes = {
  appearance: PropTypes.shape({
    quotingContent: PropTypes.shape({
      id: PropTypes.string,
      externalThumbUrl: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string
    }).isRequired
  }).isRequired
}

export default _
