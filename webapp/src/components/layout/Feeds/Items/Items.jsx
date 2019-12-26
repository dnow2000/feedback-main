import { getStateKeyFromConfig } from 'fetch-normalize-data'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { requestData } from 'redux-thunk-data'

import { getItemsActivityTagFromConfig, selectItems } from './utils'

const REACHABLE_THRESHOLD = -10
const UNREACHABLE_THRESHOLD = -10000


const Items = ({
  cols,
  config,
  dispatch,
  isPending,
  items,
  renderItem
}) => {
  const [hasMore, setHasMore] = useState(true)
  const [threshold, setThreshold] = useState(REACHABLE_THRESHOLD)


  const handleGetItems = useCallback(page => {
    const { apiPath } = config
    const apiPathWithPage = `${apiPath}${apiPath.includes('?') ? '&' : '?'}page=${page}`
    dispatch(requestData({
      ...config,
      activityTag: getItemsActivityTagFromConfig(config),
      apiPath: apiPathWithPage,
      handleFail: () => setHasMore(false),
      handleSuccess: (state, action) => {
        const { payload: { data, headers } } = action
        const nextItems = selectItems(state, config)
        const totalItemsCount = parseInt(headers['total-data-count'], 10)
        // TEMPORARY WAITING THAT fetch-normalize-data
        // passes directly the already updated state
        // const currentItemsCount = nextItems.length
        const currentItemsCount = nextItems.length + data.length
        setHasMore(currentItemsCount < totalItemsCount)
        setThreshold(REACHABLE_THRESHOLD)
      }
    }))
  }, [dispatch, setHasMore, setThreshold])


  const handleLoadMore = useCallback(page => {
    if (isPending || !hasMore) return
    setThreshold(UNREACHABLE_THRESHOLD)
    handleGetItems(page)
  }, [
    hasMore,
    handleGetItems,
    isPending,
    setThreshold
  ])


  return (
    <InfiniteScroll
      className='items'
      hasMore={hasMore}
      loadMore={handleLoadMore}
      threshold={threshold}
      pageStart={0}
      useWindow
    >
      {
        (items || []).map(item => (
          <div
            className={`item-wrapper col-tablet-1of${cols}`}
            key={item.id}
          >
            {renderItem(item)}
          </div>
        ))
      }
    </InfiniteScroll>
  )
}

Items.defaultProps = {
  cols: 2,
  isPending: false,
}

Items.propTypes = {
  cols: PropTypes.number,
  config: PropTypes.shape().isRequired,
  isPending: PropTypes.bool,
  items: PropTypes.array,
  renderItem: PropTypes.func.isRequired
}

export default Items
