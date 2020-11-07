import PropTypes from 'prop-types'
import React from 'react'
import { Img } from 'react-image'

import { API_THUMBS_URL, API_URL } from 'utils/config'

const FALLBACK_THUMB_URL = `${API_URL}/static/logo.png`


const _ = ({
  className,
  collectionName,
  id,
  externalThumbUrl,
  thumbCount
}) => {
  const thumbUrl = thumbCount > 0
    ? `${API_THUMBS_URL}/contents/${id}`
    : externalThumbUrl
  const proxyThumbUrl = thumbUrl && `${API_URL}/images?url=${encodeURIComponent(thumbUrl)}`


  return (
    <Img
      alt={`${collectionName}-${id}`}
      className={className}
      src={[thumbUrl, proxyThumbUrl, FALLBACK_THUMB_URL]}
    />
  )
}



_.defaultProps = {
  className: null,
  externalThumbUrl: null,
}

_.propTypes = {
  className: PropTypes.string,
  collectionName: PropTypes.string.isRequired,
  externalThumbUrl: PropTypes.string,
  id: PropTypes.string.isRequired,
  thumbCount: PropTypes.number.isRequired
}


export default _
