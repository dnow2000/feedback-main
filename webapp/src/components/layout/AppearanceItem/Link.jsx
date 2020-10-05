import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

import Items from 'components/layout/Items'
import ThumbImg from 'components/layout/ThumbImg'
import { numberShortener } from 'utils/shorteners'

import AppearanceItem  from 'components/layout/AppearanceItem'


const _ = ({ articleOrVideoContent }) => {
  const {
    archiveUrl,
    id,
    title,
    totalShares,
    url
  } = articleOrVideoContent
  const { hostname } = new URL(url) || ''

  const interactionsConfig = useMemo(() => ({
    apiPath: `/appearances?quotedContentId=${id}&limit=4`
  }), [id])


  const [displayInteractions, setDisplayInteractions] = useState(false)

  const handleSetDisplayInteractions = useCallback(() =>
    setDisplayInteractions(previousDisplayInteractions => !previousDisplayInteractions),
    [setDisplayInteractions])

  const renderInteractions = useCallback(item => {
    // TODO: waiting that type is in the database
    item.type = 'share'
    return (
      <AppearanceItem
        appearance={item}
        key={item.id}
      />
    )
  }, [])


  return (
    <>
      <div className="appearance-link">
        <ThumbImg
          className='appearance-link-img'
          collectionName='contents'
          {...articleOrVideoContent}
        />
        <div className="appearance-link-data">
          <h4 className='appearance-link-title'>
            {title}
          </h4>
          <p className="text-muted appearance-link-source">
            <small>
              {hostname}
            </small>
          </p>
          <p className="appearance-link-url">
            { archiveUrl && (
              <a
                className="appearance-link-url"
                href={archiveUrl}
                rel='noopener noreferrer'
                target='_blank'
              >
                {"[ Archive link ]"}
              </a>
            )}
          </p>
          <div className="appearance-link-footer">
            {totalShares === 0
              ? (
                <div className='share-list dropdown text-center'>
                  {'No shares available for this link.'}
                </div>
              )
              : (
                <>
                  <span>
                    {`${numberShortener(totalShares)} shares`}
                  </span>
                  <button
                    onClick={handleSetDisplayInteractions}
                    type='button'
                  >
                    {'View Top Shares'}
                  </button>
                </>
              )}
          </div>
        </div>
      </div>
      {displayInteractions && (
        <Items
          config={interactionsConfig}
          limit={4}
          renderItem={renderInteractions}
        />
      )}
    </>
  )
}

_.propTypes = {
  articleOrVideoContent: PropTypes.shape({
    archiveUrl: PropTypes.string,
    id: PropTypes.string,
    externalThumbUrl: PropTypes.string,
    totalShares: PropTypes.number,
    title: PropTypes.string,
    url: PropTypes.string
  }).isRequired
}

export default _
