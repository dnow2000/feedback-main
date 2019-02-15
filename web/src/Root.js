import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

import NotMatch from './components/pages/NotMatch'
import App from './App'
import routes from './utils/routes'
import { configureStore } from './utils/store'

const { store, persistor } = configureStore()

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App>
          <Switch>
            {routes &&
              routes.map(obj => obj && <Route {...obj} key={obj.path} />)}
            <Route component={NotMatch} />
          </Switch>
        </App>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)

export default hot(module)(Root)
