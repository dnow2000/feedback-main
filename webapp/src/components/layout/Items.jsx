import { getStateKeyFromConfig } from 'fetch-normalize-data'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import { requestData, selectEntitiesByKeyAndActivityTagsAndStrictness } from 'redux-thunk-data'

import Spinner from 'components/layout/Spinner'

import { getItemsActivityTagFromConfig } from './Controls'


const REACHABLE_THRESHOLD = -10
const UNREACHABLE_THRESHOLD = -10000


const selectItems = (state, config) =>
  selectEntitiesByKeyAndActivityTagsAndStrictness(
    state,
    getStateKeyFromConfig(config),
    [getItemsActivityTagFromConfig(config)],
    'includes'
  )

const selectRequest = (state, config) =>
  state.requests[getItemsActivityTagFromConfig(config)]

const _ = ({
  cols,
  config,
  itemsCollection,
  limit,
  loadMoreAction,
  renderItem,
  shouldLoadMore
}) => {
  const dispatch = useDispatch()
  const [isEmpty, setIsEmpty] = useState()

  const [threshold, setThreshold] = useState(REACHABLE_THRESHOLD)

  const { headers, isPending=true, isSuccess } = useSelector(state =>
    selectRequest(state, config)) || {}
  const { hasMore=true, currentPage=1 } = headers || {}

  const items = useSelector(state => selectItems(state, config))
  itemsCollection = itemsCollection.length > 0 ? itemsCollection : items
  if (limit) itemsCollection = itemsCollection?.slice(0, limit)


  const handleGetItems = useCallback(page => {
    const { apiPath } = config
    const apiPathWithPage = `${apiPath}${apiPath.includes('?') ? '&' : '?'}page=${page}`
    dispatch(requestData({
      ...config,
      activityTag: getItemsActivityTagFromConfig(config),
      apiPath: apiPathWithPage,
      handleSuccess: (state, action) =>
        setIsEmpty(!action.payload.data.length)
    }))
  }, [config, dispatch, setIsEmpty])

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
    handleGetItems(parseInt(currentPage))
    setThreshold(REACHABLE_THRESHOLD)
    // eslint-disable-next-line
  }, [config, handleGetItems, shouldLoadMore])

  useEffect(() => {
    if (isSuccess) {
      setThreshold(REACHABLE_THRESHOLD)
    } else {
      setThreshold(UNREACHABLE_THRESHOLD)
    }
  }, [isSuccess])


  const itemsElement = (itemsCollection || []).map(item => (
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
        <div className='items'>
          {itemsElement}
          {/*Bind Show More Action*/}
        </div>
        <div className="show-more">
          <button
            onClick={loadMoreAction}
            type='button'
          >
            Show More
          </button>
        </div>
      </>
    )
  }

  if (isEmpty) {
    return (
      <>
        No items
      </>
    )
  }


  return (
    <InfiniteScroll
      className='items'
      hasMore={hasMore}
      key={config.apiPath}
      loadMore={handleLoadMore}
      loader={<Spinner key={42} />}
      pageStart={parseInt(currentPage)}
      threshold={threshold}
    >
      {itemsElement}
    </InfiniteScroll>
  )
}


_.defaultProps = {
  cols: 2,
  itemsCollection: [],
  limit: 0,
  loadMoreAction: () => {},
  shouldLoadMore: true
}


_.propTypes = {
  cols: PropTypes.number,
  config: PropTypes.shape().isRequired,
  itemsCollection: PropTypes.arrayOf(PropTypes.any),
  limit: PropTypes.number,
  loadMoreAction: PropTypes.func,
  renderItem: PropTypes.func.isRequired,
  shouldLoadMore: PropTypes.bool,
}


export default _
