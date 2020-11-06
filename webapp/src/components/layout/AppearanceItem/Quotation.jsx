import React, { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectEntitiesByKeyAndJoin } from 'redux-thunk-data'

import Items from 'components/layout/Items'
import ThumbImg from 'components/layout/ThumbImg'
import { numberShortener } from 'utils/shorteners'

import AppearanceItem  from 'components/layout/AppearanceItem'


const _ = ({ articleOrVideoContent, appearanceId }) => {
  const {
    archiveUrl,
    id,
    title,
    totalShares,
    url
  } = articleOrVideoContent || {}
  const { hostname } = url ? new URL(url) : ''

  const history = useHistory()

  const loadMoreAction = useCallback(() => {
    history.push(`/appearances/${appearanceId}/interactions`)
  }, [appearanceId, history])

  const interactionsConfig = useMemo(() => ({
    apiPath: `/appearances?quotedContentId=${id}&limit=4`
  }), [id])


  const [displayInteractions, setDisplayInteractions] = useState(false)

  const handleSetDisplayInteractions = useCallback(() =>
    setDisplayInteractions(previousDisplayInteractions => !previousDisplayInteractions),
    [setDisplayInteractions])

  const renderInteractions = useCallback(item => (
    <AppearanceItem
      appearance={item}
      key={item.id}
    />
  ), [])

  const shareAppearances = useSelector(
    state => selectEntitiesByKeyAndJoin(
      state,
      'appearances',
      { key: 'quotedContentId', value: id }
    ), [id]
  )


  return (
    <>
      <div className="quotation">
        <ThumbImg
          className='quotation-img'
          collectionName='contents'
          {...articleOrVideoContent}
        />
        <div className="quotation-data">
          <h4 className='quotation-title'>
            {title}
          </h4>
          <p className="text-muted quotation-source">
            <small>
              {hostname}
            </small>
          </p>
          <p className="quotation-url">
            { archiveUrl && (
              <a
                className="quotation-url"
                href={archiveUrl}
                rel='noopener noreferrer'
                target='_blank'
              >
                {"[ Archive link ]"}
              </a>
            )}
          </p>
          <div className="quotation-footer">
            {!totalShares
              ? (
                <div className='share-list dropdown text-center'>
                  {'No shares available for this quotation.'}
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
          itemsCollection={shareAppearances}
          limit={4}
          loadMoreAction={loadMoreAction}
          renderItem={renderInteractions}
        />
      )}
    </>
  )
}

_.propTypes = {
  appearanceId: PropTypes.string.isRequired,
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
