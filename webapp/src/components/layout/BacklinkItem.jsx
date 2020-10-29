/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'

import ThumbImg from 'components/layout/ThumbImg'


const _ = ({ id, link: { displayLink, htmlSnippet, thumbImg, title }}) => {
  return (
    <div className="backlink">
      <ThumbImg
        className='backlink-img'
        collectionName='contents'
        externalThumbUrl={thumbImg}
        id={`${id}`}
        thumbCount={0}
      />
      <div className="backlink-data">
        <h4 className='backlink-title'>
          {title}
        </h4>
        <p className="text-muted backlink-source">
          <small>
            {displayLink}
          </small>
        </p>
        <p
          className="backlink-content"
          dangerouslySetInnerHTML={{__html: htmlSnippet}}
        />
      </div>
    </div>
  )
}

_.propTypes = {
  id: PropTypes.number.isRequired,
  link: PropTypes.shape().isRequired
}

export default _
