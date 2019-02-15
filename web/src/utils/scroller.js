import React from 'react'
import { InfiniteScroller } from 'pass-culture-shared'

InfiniteScroller.defaultProps.renderFinished = () => (
  <li className="has-text-centered">
    -
  </li>
)
