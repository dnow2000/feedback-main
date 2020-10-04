import { getStateKeyFromConfig } from 'fetch-normalize-data'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
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


const _ = ({
  cols,
  config,
  limit,
  renderItem,
  shouldLoadMore
}) => {
  const dispatch = useDispatch()

  const [threshold, setThreshold] = useState(REACHABLE_THRESHOLD)

  const { headers, isPending, isSuccess } = useSelector(state =>
    selectRequest(state, config)) || {}
  const { hasMore=true } = headers || {}

  const items = useSelector(state => selectItems(state, config))


  const handleGetItems = useCallback(page => {
    const { apiPath } = config
    const apiPathWithPage = `${apiPath}${apiPath.includes('?') ? '&' : '?'}page=${page}`
    dispatch(requestData({
      ...config,
      activityTag: getItemsActivityTagFromConfig(config),
      apiPath: apiPathWithPage,
    }))
  }, [config, dispatch])

  const handleLoadMore = useCallback(page => {
    if (isPending || !hasMore || !shouldLoadMore) return
    setThreshold(UNREACHABLE_THRESHOLD)
    handleGetItems(page)
  }, [
    hasMore,
    handleGetItems,
    isPending,
    setThreshold,
    shouldLoadMore
  ])


  useEffect(() => {
    handleGetItems(0)
  }, [config, handleGetItems, shouldLoadMore])

  useEffect(() => {
    if (isSuccess) setThreshold(REACHABLE_THRESHOLD)
  }, [isSuccess])


  const itemsElement = (items || []).map(item => (
    <div
      className={`item-wrapper col-tablet-1of${cols}`}
      key={item.id}
    >
      {renderItem(item)}
    </div>
  ))

  if (limit) {
    return (
      <>
        {itemsElement}
        {/*Bind Show More Action*/}
        <div className="show-more">
          <button type='button'>
            Show More
         </button>
       </div>
      </>
    )
  }


  return (
    <InfiniteScroll
      className='items'
      hasMore={hasMore}
      key={config.apiPath}
      loadMore={handleLoadMore}
      pageStart={0}
      threshold={threshold}
      useWindow
    >
      {itemsElement}
    </InfiniteScroll>
  )
}


_.defaultProps = {
  cols: 2,
  shouldLoadMore: true
}


_.propTypes = {
  cols: PropTypes.number,
  config: PropTypes.shape().isRequired,
  renderItem: PropTypes.func.isRequired,
  shouldLoadMore: PropTypes.bool,
}


export default _
