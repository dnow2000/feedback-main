import { getStateKeyFromConfig } from 'fetch-normalize-data'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { requestData } from 'redux-thunk-data'

import { selectItems } from './utils'

const REACHABLE_THRESHOLD = -10
const UNREACHABLE_THRESHOLD = -10000

const initialState = {
  hasMore: true,
  hasResetPage: false,
  //page: null,
  resetCount: 0,
  threshold: REACHABLE_THRESHOLD
}

const Items = ({
  cols,
  config,
  dispatch,
  history,
  isPending,
  items,
  location,
  renderItem,
  query,
}) => {
  const { search } = location
  const { page } = query.getParams()
  //const [state, setState] = useState(initialState)
  //const { hasMore, hasResetPage, resetCount, threshold } = state
  const [hasMore, setHasMore] = useState(true)
  const [threshold, setThreshold] = useState(REACHABLE_THRESHOLD)

  const noItems = !items || items.length === 0
  const needsToInit = !page || noItems

  /*
  if (!hasResetPage) {
    return null
  }
  */

  const handleGetItems = useCallback(page => {
    console.log('WTF', page)
    const apiSearch = query.getSearchFromUpdate({ page })

    const stateKey = getStateKeyFromConfig(config)
    dispatch(requestData({
      activityTag: `/${stateKey}`,
      apiPath: `/${stateKey}${apiSearch}`,
      handleFail: () => setHasMore(false),
      handleSuccess: (state, action) => {
        const { payload: { data, headers } } = action
        const nextItems = selectItems(state, config)
        const totalItemsCount = parseInt(headers['total-data-count'], 10)
        // TEMPORARY WAITING THAT fetch-normalize-data
        // passes directly the already updated state
        // const currentItemsCount = nextItems.length
        const currentItemsCount = nextItems.length + data.length
        console.log({currentItemsCount, totalItemsCount})
        setHasMore(currentItemsCount < totalItemsCount)
        setThreshold(REACHABLE_THRESHOLD)
      },
      ...config
    }))
  }, [dispatch, query, setHasMore, setThreshold])

  const handleLoadMore = useCallback(page => {
    console.log({isPending, hasMore, noItems, page})

    /*
    if (noItems && page > 0) {
      history.push(query.getSearchFromUpdate({ page: null }))
      return
    }
    */

    if (isPending || !hasMore) return
    /*
    setState({
      ...initialState,
      page,
      resetCount,
      threshold: UNREACHABLE_THRESHOLD
    })
    */
    console.log({page})
    setThreshold(UNREACHABLE_THRESHOLD)
    handleGetItems(page)
    //history.push(query.getSearchFromUpdate({ page }))
  }, [
    hasMore,
    handleGetItems,
    //history,
    isPending,
    noItems,
    //query,
    // resetCount,
    //setState
    setThreshold
  ])

  /*
  useEffect(() => {
    if (!needsToInit) return
    history.push(query.getSearchFromUpdate({ page: 1 }))
  }, [history, needsToInit, query])
  */

  useEffect(() => {
    console.log('ET LA', {page, search})
    if (!page) return
    handleGetItems()
  }, [handleGetItems, search])

  /*
  useEffect(() => {
    if (!isPending || noItems) return
    console.log('ICI')

  }, [isPending, noItems, setThreshold])
  */

  //if (needsToInit) return null

  console.log('RENDER', { threshold, hasMore, items })
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
