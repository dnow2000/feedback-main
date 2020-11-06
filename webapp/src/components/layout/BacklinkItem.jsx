/* eslint-disable react/no-danger */
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'

import BacklinkReviewMenu from 'components/layout/BacklinkReviewMenu'
import BacklinkReviewForm from 'components/layout/BacklinkReviewForm'
import ThumbImg from 'components/layout/ThumbImg'


const _ = ({ id, link: { displayLink, htmlSnippet, thumbImg, title }}) => {
  const [linkReviewMenuVisible, setLinkReviewMenuVisible] = useState(false)
  const [linkReviewFormVisible, setLinkReviewFormVisible] = useState(false)

  const handleHideAll = useCallback(() => {
    setLinkReviewFormVisible(false)
    setLinkReviewMenuVisible(false)
  }, [])

  const handleShowForm = useCallback(() => {
    setLinkReviewFormVisible(true)
    setLinkReviewMenuVisible(false)
  }, [])

  const handleMenuVisibility = useCallback(() => {
    if (linkReviewMenuVisible || linkReviewFormVisible) {
      handleHideAll()
    } else {
      setLinkReviewMenuVisible(true)
    }
  }, [handleHideAll, linkReviewFormVisible, linkReviewMenuVisible])

  return (
    <div className="backlink">
      <div className='backlink-container'>
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
        <button
          className='backlink-show-menu-button'
          onClick={handleMenuVisibility}
          type='button'
        >
          &bull;&bull;&bull;
        </button>
      </div>
      { linkReviewMenuVisible && (
        <BacklinkReviewMenu
          handleHideAll={handleHideAll}
          handleShowForm={handleShowForm}
        />
      ) }
      { linkReviewFormVisible && (
        <BacklinkReviewForm />
      ) }
    </div>
  )
}

_.propTypes = {
  id: PropTypes.number.isRequired,
  link: PropTypes.shape().isRequired
}

export default _
