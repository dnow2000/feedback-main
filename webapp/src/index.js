import React from 'react'
import ReactDOM from 'react-dom'

import Root from 'components/Root'
import 'utils/styles'
import * as serviceWorker from 'workers/service'

ReactDOM.render(<Root />, document.getElementById('root'))

serviceWorker.unregister()
