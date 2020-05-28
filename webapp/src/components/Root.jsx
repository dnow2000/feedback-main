import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

import NotMatch from 'components/pages/NotMatch'
import routes from 'components/router/routes'
import { configureStore } from 'utils/store'

import App from './App'


const { store, persistor } = configureStore()


export default () => (
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
    >
      <BrowserRouter>
        <App>
          <Switch>
            {routes.map(route => (
              <Route
                {...route}
                key={route.path}
              />)}
            <Route component={NotMatch} />
          </Switch>
        </App>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
