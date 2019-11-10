import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

const { NODE_ENV } = process.env

const App = ({ children }) => (
  <Fragment>
    <Helmet>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#000000" />
      <meta
        httpEquiv="Content-Security-Policy"
        content={`default-src 'self' blob: data: https: http: gap://ready 'unsafe-inline'
                ${NODE_ENV === 'development' && "'unsafe-eval'"};
                connect-src 'self'
                https: http: ws://localhost:3000 wss://web-local:3000`}
      />
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      <title>Science Feedback</title>
    </Helmet>
    {children}
  </Fragment>
)

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default App
