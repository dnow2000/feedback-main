import { getStateKeyFromConfig } from 'fetch-normalize-data'
import PropTypes from 'prop-types'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import { requestData } from 'redux-thunk-data'

import selectEntitiesByKeyAndActivityTags from 'selectors/selectEntitiesByKeyAndActivityTags'

import { getItemsActivityTagFromConfig } from './Controls'

const REACHABLE_THRESHOLD = -10
const UNREACHABLE_THRESHOLD = -10000




const selectItems = (state, config) =>
  selectEntitiesByKeyAndActivityTags(
    state,
    getStateKeyFromConfig(config),
    [getItemsActivityTagFromConfig(config)]
  )

const selectRequest = (state, config) =>
  state.requests[getItemsActivityTagFromConfig(config)]


const Items = ({
  cols,
  config,
  renderItem
}) => {
  const dispatch = useDispatch()


  const [hasMore, setHasMore] = useState(true)

  const [threshold, setThreshold] = useState(REACHABLE_THRESHOLD)


  const { isPending } = useSelector(state => selectRequest(state, config)) || {}

  const items = useSelector(state => selectItems(state, config))


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
  }, [config, dispatch, setHasMore, setThreshold])


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
  renderItem: PropTypes.func.isRequired
}

export default Items
