import React from 'react'
import PropTypes from 'prop-types'

import ThumbImg from 'components/layout/ThumbImg'

import { numberShortener } from 'utils/shorteners'


const _ = ({ appearance: { quotingContent } }) => {
  const { totalShares, title, url } = quotingContent
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
        <div className="appearance-footer">
          { totalShares > 0 && (
            <span>
              {`${numberShortener(totalShares)} shares`}
            </span>
          ) }
        </div>
      </div>
    </a>
  )
}

_.propTypes = {
  appearance: PropTypes.shape({
    quotingContent: PropTypes.shape({
      id: PropTypes.string,
      externalThumbUrl: PropTypes.string,
      totalShares: PropTypes.number,
      title: PropTypes.string,
      url: PropTypes.string
    }).isRequired
  }).isRequired
}

export default _
