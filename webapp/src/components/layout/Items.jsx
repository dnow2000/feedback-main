import PropTypes from 'prop-types'
import LoadingInfiniteScroll from 'react-loading-infinite-scroller'
import React from 'react'

const Items = ({ cols, hasMore, isLoading, items, renderItem }) => (
  <LoadingInfiniteScroll
    className='items'
    hasMore={hasMore}
    isLoading={isLoading}
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

Items.defaultProps = {
  cols: 2
}

Items.propTypes = {
  cols: PropTypes.number,
  hasMore: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  items: PropTypes.array,
  renderItem: PropTypes.func.isRequired
}

export default Items
