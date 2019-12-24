import { getStateKeyFromConfig } from 'fetch-normalize-data'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import LoadingInfiniteScroll from 'react-loading-infinite-scroller'
import { requestData } from 'redux-thunk-data'

import { selectItems } from './utils'

const Items = ({
  cols,
  config,
  dispatch,
  isPending,
  items,
  renderItem
}) => {
  const [hasMore, setHasMore] = useState(true)

  const handleGetItems = useCallback(() => {
    dispatch(requestData({
      activityTag: `/${getStateKeyFromConfig(config)}`,
      handleFail: () => setHasMore(false),
      handleSuccess: (state, action) => {
        const { payload: { data, headers } } = action
        const nextItems = selectItems(state, config)
        const totalItemsCount = parseInt(headers['total-data-count'], 10)
        const currentItemsCount = nextItems.length
        setHasMore(currentItemsCount < totalItemsCount)
      },
      ...config
    }))
  }, [dispatch, setHasMore])

  useEffect(() => { handleGetItems() }, [config])

  return (
    <LoadingInfiniteScroll
      className='items'
      hasMore={hasMore}
      isLoading={isPending}
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
    </LoadingInfiniteScroll>
  )
}

Items.defaultProps = {
  cols: 2
}

Items.propTypes = {
  cols: PropTypes.number,
  config: PropTypes.shape().isRequired,
  isPending: PropTypes.bool.isRequired,
  items: PropTypes.array,
  renderItem: PropTypes.func.isRequired
}

export default Items
