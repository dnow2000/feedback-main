import capitalize from 'lodash.capitalize'
import PropTypes from 'prop-types'
import React from 'react'
import Helmet from 'react-helmet'

import {
  APP_NAME,
  IS_DEVELOPMENT,
  ROOT_LOGO_ICONS_PATH,
  ROOT_PATH
} from 'utils/config'


const App = ({ children }) => (
  <>
    <Helmet>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content={`${ROOT_LOGO_ICONS_PATH}/ms-icon-144x144.png`} />
      <meta name="theme-color" content="#ffffff" />
      <meta
        httpEquiv="Content-Security-Policy"
        content={`default-src 'self' blob: data: https: http: gap://ready 'unsafe-inline'
                ${IS_DEVELOPMENT && "'unsafe-eval'"};
                connect-src 'self'
                https: http: ws://localhost:3000 wss://web-local:3000`}
      />
      <link rel="apple-touch-icon" sizes="57x57" href={`${ROOT_LOGO_ICONS_PATH}/apple-icon-57x57.png`} />
      <link rel="apple-touch-icon" sizes="60x60" href={`${ROOT_LOGO_ICONS_PATH}/apple-icon-60x60.png`} />
      <link rel="apple-touch-icon" sizes="72x72" href={`${ROOT_LOGO_ICONS_PATH}/apple-icon-72x72.png`} />
      <link rel="apple-touch-icon" sizes="76x76" href={`${ROOT_LOGO_ICONS_PATH}/apple-icon-76x76.png`} />
      <link rel="apple-touch-icon" sizes="114x114" href={`${ROOT_LOGO_ICONS_PATH}/apple-icon-114x114.png`} />
      <link rel="apple-touch-icon" sizes="120x120" href={`${ROOT_LOGO_ICONS_PATH}/apple-icon-120x120.png`} />
      <link rel="apple-touch-icon" sizes="144x144" href={`${ROOT_LOGO_ICONS_PATH}/apple-icon-144x144.png`} />
      <link rel="apple-touch-icon" sizes="152x152" href={`${ROOT_LOGO_ICONS_PATH}/apple-icon-152x152.png`} />
      <link rel="apple-touch-icon" sizes="180x180" href={`${ROOT_LOGO_ICONS_PATH}/apple-icon-180x180.png`} />
      <link rel="icon" type="image/png" sizes="192x192"  href={`${ROOT_LOGO_ICONS_PATH}/android-icon-192x192.png`} />
      <link rel="icon" type="image/png" sizes="32x32" href={`${ROOT_LOGO_ICONS_PATH}/favicon-32x32.png`} />
      <link rel="icon" type="image/png" sizes="96x96" href={`${ROOT_LOGO_ICONS_PATH}/favicon-96x96.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`${ROOT_LOGO_ICONS_PATH}/favicon-16x16.png`} />
      <link rel="manifest" href={`${ROOT_PATH}/manifest.json`} />
      <title>{capitalize(APP_NAME)} Webapp</title>
    </Helmet>
    {children}
  </>
)

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default App
