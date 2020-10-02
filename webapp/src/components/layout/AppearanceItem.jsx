import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'

import ThumbImg from 'components/layout/ThumbImg'
import ShareItem from 'components/layout/ShareItem'
import { verdictNormalizer } from 'utils/normalizers'
import { numberShortener } from 'utils/shorteners'


const _ = ({ appearance: { id, quotingContent, interactions } }) => {
  const { archiveUrl, totalShares, title, url } = quotingContent
  const { hostname } = new URL(url) || ''

  const dispatch = useDispatch()

  const handleGetInteractions = useCallback(() => {
    dispatch(requestData({
      apiPath: `/appearances/${id}/interactions?limit=4`,
      normalizer: verdictNormalizer
    }))
  }, [dispatch, id])

  let shareList
  if (interactions) {
    shareList = interactions.length > 0 ? (
      <div className='share-list dropdown'>
        { interactions.map(interaction => {
          return (
            <ShareItem
              item={interaction}
              key={interaction.post.id}
            />
          )
        }) }
        <div className="share-list-view-more text-center">
          <Link to={`/appearances/${id}/interactions`}>
            {'View full list'}
          </Link>
        </div>
      </div>
    ) : (
      <div className='share-list dropdown text-center'>
        {'No interaction details available for this link.'}
      </div>
    )
  }

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
      {shareList}
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
