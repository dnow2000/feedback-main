import React from 'react'
import PropTypes from 'prop-types'

import ThumbImg from 'components/layout/ThumbImg'


const _ = ({ appearance: { quotingContent } }) => {
  const { title, url } = quotingContent
  const { hostname } = new URL(url)

  return (
    <a
      className="appearance-item"
      href={url}
      rel='noopener noreferrer'
      target='_blank'
    >
      <ThumbImg
        className='appearance-item-img'
        collectionName='contents'
        {...quotingContent}
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
