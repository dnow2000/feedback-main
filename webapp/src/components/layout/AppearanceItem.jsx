import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { requestData } from 'redux-thunk-data'

import ThumbImg from 'components/layout/ThumbImg'
import ShareItem from 'components/layout/ShareItem'
import Loader from 'components/layout/LoadMore'
import { verdictNormalizer } from 'utils/normalizers'
import { numberShortener } from 'utils/shorteners'


const _ = ({ appearance: { id, quotingContent, interactions } }) => {
  const { archiveUrl, totalShares, title, url } = quotingContent
  const { hostname } = new URL(url)

  const dispatch = useDispatch()

  const handleGetInteractions = useCallback(() => {
    dispatch(requestData({
      apiPath: `/appearances/${id}/interactions`,
      normalizer: verdictNormalizer
    }))
  })

  const showMoreButton = useCallback(props => (
    <div className="show-more">
      <button
        type='button'
        {...props}
      >
        {props.text}
      </button>
    </div>
  ), [])

  const renderShareItem = useCallback(shareItem => {
    return (
      <ShareItem
        item={shareItem}
        key={shareItem.post.id}
      />
  )}, [])

  return (
    <>
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
              <>
                <span>
                  {`${numberShortener(totalShares)} interactions`}
                </span>
                <button
                  onClick={handleGetInteractions}
                  type='button'
                >
                  {'View Top Posts'}
                </button>
              </>
            ) }
          </div>

        </div>
      </div>
      { interactions && (
        <div className='share-list dropdown'>
          <Loader
            Button={showMoreButton}
            items={interactions}
            loadLessText='Show less'
            loadMoreText='Show more'
            renderItem={renderShareItem}
          />
        </div>
      ) }
    </>
  )
}

_.propTypes = {
  appearance: PropTypes.shape({
    id: PropTypes.string.isRequired,
    interactions: PropTypes.arrayOf(
      PropTypes.object
    ),
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
