import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import Spinner from './Spinner'
import { withQueryRouter } from '../hocs/withQueryRouter'

const REACHABLE_THRESHOLD = -10
const UNREACHABLE_THRESHOLD = -10000

class LoadingInfiniteScroll extends PureComponent {
  constructor() {
    super()
    this.state = {
      hasResetPage: false,
      page: null,
      resetCount: 0,
      threshold: REACHABLE_THRESHOLD
    }
  }

  componentDidMount () {
    this.handleResetPage()
  }

  componentDidUpdate (prevProps) {
    const { isLoading, query } = this.props
    const { page } = this.state
    const queryParams = query.parse()

    if (!isLoading && prevProps.isLoading) {
      this.handleResetThreshold()
    }

    if (!queryParams.page && page) {
      this.handleResetScroll()
      return
    }

    this.handleResetPageHasBeenDone()
  }


  handleResetScroll = () => {
    const { hasResetPage } = this.state
    if (hasResetPage) {
      this.setState(({ resetCount }) => ({
        page: null,
        resetCount: resetCount + 1
      }))
    }
  }

  handleResetThreshold = () => {
    this.setState({ threshold: REACHABLE_THRESHOLD })
  }

  handleResetPage = () => {
    const { query } = this.props
    const queryParams = query.parse()
    if (queryParams.page) {
      query.change({ page: null })
    }
  }

  handleResetPageHasBeenDone = () => {
    const { query } = this.props
    const queryParams = query.parse()
    const { hasResetPage } = this.state

    if (hasResetPage) {
      return
    }

    if (!queryParams.page) {
      this.setState({ hasResetPage: true })
    }
  }

  loadMore = page => {
    const { isLoading, query } = this.props
    if (isLoading) {
      return
    }

    this.setState(
      { page, threshold: UNREACHABLE_THRESHOLD },
      () => query.change({ page }, { historyMethod: 'replace' })
    )
  }

  render() {
    const {
      children,
      element,
      getScrollParent,
      hasMore,
      query,
      useWindow
    } = this.props
    const { hasResetPage, resetCount, threshold } = this.state
    const queryParams = query.parse()

    const pageStart = parseInt(queryParams.page || 1, 10)

    if (!hasResetPage) {
      return null
    }

    const thresholdDependingOnChildren = (children && children.length)
      ? threshold
      : UNREACHABLE_THRESHOLD

    return (
      <InfiniteScroll
        element={element}
        getScrollParent={getScrollParent}
        hasMore={hasMore}
        key={resetCount}
        loader={<Spinner key="loader" />}
        loadMore={this.loadMore}
        pageStart={pageStart}
        threshold={thresholdDependingOnChildren}
        useWindow={useWindow}
      >
        {children}
      </InfiniteScroll>
    )
  }
}

LoadingInfiniteScroll.defaultProps = {
  element: "div",
  getScrollParent: null,
  hasMore: false,
  isLoading: false,
  useWindow: false
}

LoadingInfiniteScroll.propTypes = {
  children: PropTypes.node.isRequired,
  element: PropTypes.string,
  getScrollParent: PropTypes.func,
  hasMore: PropTypes.bool,
  isLoading: PropTypes.bool,
  query: PropTypes.object.isRequired,
  useWindow: PropTypes.bool,
}

export default withQueryRouter(LoadingInfiniteScroll)
