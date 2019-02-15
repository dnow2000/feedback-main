/* eslint no-underscore-dangle: 0 */
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'
import { compose, createStore, applyMiddleware } from 'redux'

import rootSaga from '../sagas'
import rootReducer from '../reducers'

const buildStoreEnhancer = (middlewares = []) => {
  const enhancers = []
  // use of browser react-dev-tools
  const useDevTools =
    typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  if (useDevTools) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    return composeEnhancers(...enhancers, applyMiddleware(...middlewares))
  }
  return compose(
    ...enhancers,
    applyMiddleware(...middlewares)
  )
}

// NOTE: it is important to encapsulte store
// in a function for unitary test
export const configureStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    buildStoreEnhancer([sagaMiddleware])
  )

  const persistor = persistStore(store)

  sagaMiddleware.run(rootSaga)

  return { persistor, store }
}

export default configureStore
