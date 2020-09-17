import React from 'react'
import PropTypes from 'prop-types'

import ThumbImg from 'components/layout/ThumbImg'

import { numberShortener } from 'utils/shorteners'


const _ = ({ appearance: { quotingContent } }) => {
  const { archiveUrl, totalShares, title, url } = quotingContent
  const { hostname } = new URL(url)

  return (
    <div
      className="appearance-item"
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
          { archiveUrl && (
            <a
              className="appearance-url"
              href={archiveUrl}
              rel='noopener noreferrer'
              target='_blank'
            >
              {"[ Archive link ]"}
            </a>
          )}
        </p>
        <div className="appearance-footer">
          { totalShares > 0 && (
            <span>
              {`${numberShortener(totalShares)} interactions`}
            </span>
          ) }
        </div>
      </div>
    </div>
  )
}

_.propTypes = {
  appearance: PropTypes.shape({
    quotingContent: PropTypes.shape({
      archiveUrl: PropTypes.string,
      id: PropTypes.string,
      externalThumbUrl: PropTypes.string,
      totalShares: PropTypes.number,
      title: PropTypes.string,
      url: PropTypes.string
    }).isRequired
  }).isRequired
}

export default _
