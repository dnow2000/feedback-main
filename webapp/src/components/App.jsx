import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

import { IS_DEVELOPMENT, ROOT_PATH } from 'utils/config'

const App = ({ children }) => (
  <>
    <Helmet>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#000000" />
      <meta
        httpEquiv="Content-Security-Policy"
        content={`default-src 'self' blob: data: https: http: gap://ready 'unsafe-inline'
                ${IS_DEVELOPMENT && "'unsafe-eval'"};
                connect-src 'self'
                https: http: ws://localhost:3000 wss://web-local:3000`}
      />
      <link rel="manifest" href={`${ROOT_PATH}/manifest.json`} />
      <title>Science Feedback</title>
    </Helmet>
    {children}
  </>
)

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default App
