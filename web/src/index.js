import React from 'react'
import ReactDOM from 'react-dom'

import './utils/install'
import Root from './Root'
import * as cacheServiceWorker from './workers/cache'

const render = () => {
  ReactDOM.render(<Root />, document.getElementById('root'))
}

cacheServiceWorker.unregister()

render()

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Root', () => {
    render()
  })
}
