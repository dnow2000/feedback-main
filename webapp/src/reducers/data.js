import { createDataReducer } from 'redux-thunk-data'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { APP_NAME } from 'utils/config'


const dataPersistConfig = {
  key: `${APP_NAME}-webapp-data`,
  storage,
  whitelist: [],
}

const dataReducer = createDataReducer()

export default persistReducer(dataPersistConfig, dataReducer)
