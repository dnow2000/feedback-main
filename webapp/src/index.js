import React from 'react'
import ReactDOM from 'react-dom'

import Root from 'components/Root'
import 'utils/styles'
import 'utils/touchmove'
import { register as registerCacheServiceWorker } from 'workers/cache'


ReactDOM.render(<Root />, document.getElementById('root'))

registerCacheServiceWorker()
