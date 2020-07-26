import React from 'react'
import { Img } from 'react-image'
import PropTypes from 'prop-types'

import { API_THUMBS_URL, API_URL } from 'utils/config'


const FALLBACK_THUMB_URL = `${API_URL}/static/logo.png`


const _ = ({ appearance: { quotingContent } }) => {
  const { id: contentId, externalThumbUrl, thumbCount, title, url } = quotingContent
  const { hostname } = new URL(url)
  const thumbUrl = thumbCount > 0
    ? `${API_THUMBS_URL}/contents/${contentId}`
    : externalThumbUrl
  const proxyThumbUrl = `${API_URL}/images?url=${encodeURIComponent(thumbUrl)}`


  return (
    <a
      className="appearance-item"
      href={url}
      rel='noopener noreferrer'
      target='_blank'
    >
      <Img
        alt={contentId}
        className='appearance-item-img'
        src={[thumbUrl, proxyThumbUrl, FALLBACK_THUMB_URL]}
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
